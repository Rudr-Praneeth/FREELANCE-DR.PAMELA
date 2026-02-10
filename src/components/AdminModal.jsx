import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const emptyRow = {
  date: "",
  red: "",
  yellow: "",
  blue: "",
  white: ""
};

const AdminModal = ({ onClose, onSuccess }) => {
  const [ok, setOk] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rows, setRows] = useState([{ ...emptyRow }]);

  const unlock = async () => {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      setOk(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  const addRow = () => {
    setRows([...rows, { ...emptyRow }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const submit = async () => {
    const payload = rows
      .filter(r => r.date)
      .map(r => {
        const d = new Date(r.date);

        return {
          year: d.getFullYear(),
          month: d.toLocaleString("default", { month: "long" }),
          date: r.date,
          red: Number(r.red),
          yellow: Number(r.yellow),
          blue: Number(r.blue),
          white: Number(r.white)
        };
      });

    if (!payload.length) return;

    await fetch("/api/waste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-100">
      <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-xl w-full max-w-6xl h-[85vh] text-white flex flex-col">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
        >
          <IoClose />
        </button>

        {!ok ? (
          <div className="flex flex-col justify-center h-full max-w-md mx-auto w-full">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && unlock()}
              className="w-full mb-3 bg-transparent border px-3 py-2 text-white placeholder-white/70"
              placeholder="Admin password"
            />

            {error && (
              <p className="text-red-400 text-sm mb-3">{error}</p>
            )}

            <button
              onClick={unlock}
              className="w-full py-2 bg-white/20"
            >
              Unlock
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-8 mt-4 border border-white/20 rounded-lg">
              <table className="w-full text-sm border">
                <thead>
                  <tr>
                    {["Date","Red","Yellow","Blue","White",""].map(h => (
                      <th key={h} className="border px-3 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      {["date","red","yellow","blue","white"].map(f => (
                        <td key={f} className="border px-2 py-1">
                          <input
                            type={f === "date" ? "date" : "number"}
                            value={row[f]}
                            onChange={e => updateRow(i,f,e.target.value)}
                            className={`bg-transparent px-2 py-1 w-full text-white placeholder-white/70 ${
                              f === "date" ? "[color-scheme:dark]" : ""
                            }`}
                          />
                        </td>
                      ))}

                      <td className="border text-center">
                        <button
                          onClick={() => removeRow(i)}
                          className="text-white/80 hover:text-white text-xl flex items-center justify-center w-full"
                        >
                          <IoClose />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={addRow}
                className="w-full py-2 bg-white/20"
              >
                + Add Row
              </button>

              <button
                onClick={submit}
                className="w-full py-2 bg-green-600"
              >
                Submit All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
