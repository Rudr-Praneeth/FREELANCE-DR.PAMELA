import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import * as XLSX from "xlsx";

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
  const [fileRows, setFileRows] = useState([]);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const unlock = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin-auth`, {
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

  const normalizeDate = (val) => {
    if (!val) return "";

    if (typeof val === "number") {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + val * 86400000);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    return "";
  };

  const buildPayloadFromRows = (sourceRows) => {
    const payload = sourceRows
      .filter(r => r.date)
      .map(r => {
        const formattedDate = normalizeDate(r.date);
        const d = new Date(formattedDate);
        return {
          year: !isNaN(d.getTime()) ? d.getFullYear() : new Date().getFullYear(),
          month: !isNaN(d.getTime()) ? d.toLocaleString("default", { month: "long" }) : "",
          date: formattedDate,
          red: Number(r.red) || 0,
          yellow: Number(r.yellow) || 0,
          blue: Number(r.blue) || 0,
          white: Number(r.white) || 0
        };
      });
    return payload;
  };

  const submit = async () => {
    const payload = buildPayloadFromRows(rows);
    if (!payload.length) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/waste`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    onSuccess();
    onClose();
  };

  const handleFile = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

    if (!json || !json.length) {
      setFileRows([]);
      return;
    }

    const normalized = json.map(row => {
      const keys = Object.keys(row);
      const keyMap = {};
      keys.forEach(k => keyMap[k.toLowerCase()] = k);

      const getVal = (names) => {
        const found = names.map(n => keyMap[n]).find(Boolean);
        return found ? row[found] : "";
      };

      return {
        date: normalizeDate(getVal(["date", "date of entry", "day"])),
        red: getVal(["red", "red waste", "r"]) || "",
        yellow: getVal(["yellow", "yellow waste", "y"]) || "",
        blue: getVal(["blue", "blue waste", "b"]) || "",
        white: getVal(["white", "white waste", "w"]) || ""
      };
    });

    setFileRows(normalized);
  };

  const onFileChange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    await handleFile(f);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const uploadAndSubmit = async () => {
    if (!fileRows.length) return;

    setUploading(true);

    const payload = buildPayloadFromRows(fileRows);

    if (!payload.length) {
      setUploading(false);
      return;
    }

    await fetch(`${import.meta.env.VITE_API_URL}/api/waste`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setUploading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-100">
      <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-xl w-full max-w-6xl h-[85vh] text-white flex flex-col">

        <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl">
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

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            <button onClick={unlock} className="w-full py-2 bg-white/20">
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
                            className={`bg-transparent px-2 py-1 w-full text-white placeholder-white/70 ${f === "date" ? "[color-scheme:dark]" : ""}`}
                          />
                        </td>
                      ))}

                      <td className="border text-center">
                        <button onClick={() => removeRow(i)} className="text-white/80 hover:text-white text-xl flex items-center justify-center w-full">
                          <IoClose />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-6 space-y-3">

              <div className="flex gap-3">
                <button onClick={addRow} className="flex-1 py-2 bg-white/20">
                  + Add Row
                </button>

                <button onClick={submit} className="flex-1 py-2 bg-[#1E40AF]">
                  Submit All
                </button>
              </div>

              <div className="flex gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={onFileChange}
                  className="hidden"
                />

                <button onClick={triggerFileSelect} className="flex-1 py-2 bg-white/10">
                  Select Excel
                </button>

                <button
                  onClick={uploadAndSubmit}
                  className="flex-1 py-2 bg-[#0EA5A4]"
                  disabled={uploading || !fileRows.length}
                >
                  {uploading ? "Uploading..." : fileRows.length ? `Upload & Submit (${fileRows.length})` : "Upload & Submit"}
                </button>
              </div>

              {fileRows.length > 0 && (
                <div className="mt-3 max-h-36 overflow-auto bg-white/5 p-3 rounded">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {["Date","Red","Yellow","Blue","White"].map(h => (
                          <th key={h} className="px-2 py-1 text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {fileRows.map((r, idx) => (
                        <tr key={idx}>
                          <td className="px-2 py-1">{r.date}</td>
                          <td className="px-2 py-1">{r.red}</td>
                          <td className="px-2 py-1">{r.yellow}</td>
                          <td className="px-2 py-1">{r.blue}</td>
                          <td className="px-2 py-1">{r.white}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminModal;