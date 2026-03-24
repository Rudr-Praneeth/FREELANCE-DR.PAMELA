import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
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
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/waste?year=${year}`
      );
      if (!res.ok) {
        setData({});
        setMonth("");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setMonth(Object.keys(json)[0] || "");
    } catch (err) {
      console.error(err);
      setData({});
      setMonth("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchData();
  }, [year]);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [loading, month]);

  const months = Object.keys(data);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#F8FAFC] to-[#E0F2FE]">
      <NavBar />
      <Gutters>
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#0F172A]/50 font-semibold mb-4 fade-in">
            Compliance & Reporting
          </p>

          <h1 className="font-serif text-4xl lg:text-5xl tracking-tight text-[#0F172A] fade-in">
            Biomedical
            <span className="italic font-light text-[#1E40AF]"> Waste</span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-4 fade-in">
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="bg-white/60 backdrop-blur border border-[#0F172A]/10 px-4 py-3 text-[#0F172A]"
            >
              {[currentYear, currentYear - 1, currentYear - 2].map(y => (
                <option key={y} value={y} className="bg-white text-[#0F172A]">
                  {y}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="bg-white/60 backdrop-blur border border-[#0F172A]/10 px-4 py-3 text-[#0F172A]"
            >
              {months.length > 0 ? (
                months.map(m => (
                  <option key={m} value={m} className="bg-white text-[#0F172A]">
                    {m}
                  </option>
                ))
              ) : (
                <option value="" disabled className="bg-white text-[#0F172A]">
                  No Data
                </option>
              )}
            </select>
          </div>

          <div className="mt-12">
            {loading ? (
              <WasteTable loading />
            ) : months.length === 0 ? (
              <p className="text-center text-[#0F172A]/50 fade-in">
                No data available for {year}.
              </p>
            ) : (
              month && <WasteTable data={data[month]} />
            )}
          </div>
        </div>
      </Gutters>

      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 px-5 py-3 rounded-full bg-[#1E40AF] text-[#F8FAFC] shadow-lg hover:bg-[#0EA5A4] transition-colors fade-in"
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