import React, { useEffect, useState } from "react";
import Gutters from "../layouts/Gutters";
import WasteTable from "../components/WasteTable";
import NavBar from "../components/NavBar";
import AdminModal from "../components/AdminModal";

const WasteManagement = () => {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState({});
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`/api/waste?year=${year}`);
    if (!res.ok) return;
    const json = await res.json();
    setData(json);
    setMonth(Object.keys(json)[0] || "");
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#090A10] to-[#111827]">
      <NavBar />
      <Gutters>
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold mb-4">
            Compliance & Reporting
          </p>

          <h1 className="font-serif text-4xl lg:text-5xl tracking-tight">
            Biomedical
            <span className="italic font-light text-[#7E878E]"> Waste</span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="bg-transparent border border-white/20 px-4 py-3 text-white"
            >
              {[currentYear, currentYear - 1, currentYear - 2].map(y => (
                <option key={y} value={y} className="bg-black">
                  {y}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="bg-transparent border border-white/20 px-4 py-3 text-white"
            >
              {Object.keys(data).map(m => (
                <option key={m} value={m} className="bg-black">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {month && <WasteTable data={data[month]} />}
        </div>
      </Gutters>

      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 px-4 py-3 rounded-full bg-white/10 backdrop-blur text-white"
      >
        Admin
      </button>

      {showAdmin && (
        <AdminModal
          year={year}
          onClose={() => setShowAdmin(false)}
          onSuccess={fetchData}
        />
      )}
    </section>
  );
};

export default WasteManagement;
