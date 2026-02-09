import React, { useState } from "react";

const AdminModal = ({ year, onClose, onSuccess }) => {
  const [ok, setOk] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    month: "January",
    date: "",
    red: "",
    yellow: "",
    blue: "",
    white: ""
  });

  const unlock = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setOk(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  const submit = () => {
    fetch("/api/waste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, ...form })
    }).then(() => {
      onSuccess();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl w-full max-w-sm text-white">
        {!ok ? (
          <>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && unlock()}
              className="w-full mb-3 bg-transparent border px-3 py-2"
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
          </>
        ) : (
          <>
            <select
              className="w-full mb-3 bg-transparent border px-3 py-2"
              value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
            >
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map(m => (
                <option key={m} value={m} className="bg-black">
                  {m}
                </option>
              ))}
            </select>

            {["date", "red", "yellow", "blue", "white"].map(f => (
              <input
                key={f}
                type={f === "date" ? "date" : "number"}
                placeholder={f}
                value={form[f]}
                onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="w-full mb-3 bg-transparent border px-3 py-2"
              />
            ))}

            <button
              onClick={submit}
              className="w-full py-2 bg-white/20"
            >
              Save
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 text-sm text-white/70"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminModal;
