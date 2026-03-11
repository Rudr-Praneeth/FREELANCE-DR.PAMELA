import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WasteTable = ({ data, loading }) => {
  const skeletonRef = useRef(null);

  useEffect(() => {
    if (loading && skeletonRef.current) {
      gsap.fromTo(
        skeletonRef.current.querySelectorAll(".skeleton-cell"),
        { backgroundPosition: "-200px 0" },
        {
          backgroundPosition: "200px 0",
          duration: 1.5,
          ease: "linear",
          repeat: -1
        }
      );
    }
  }, [loading]);

  if (loading) {
    const rows = Array(5).fill(0);
    return (
      <div className="mt-4 flex justify-center">
        <div
          ref={skeletonRef}
          className="w-full max-w-4xl overflow-x-auto border border-[#0F172A]/10 rounded-lg bg-white/60 backdrop-blur"
        >
          <table className="w-full text-sm table-auto text-[#0F172A]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {["Date", "Red", "Yellow", "Blue", "White", "Total"].map((h, i) => (
                  <th key={i} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((_, i) => (
                <tr key={i} className="border-b border-[#0F172A]/10">
                  {Array(6).fill(0).map((__, j) => (
                    <td key={j} className="p-3">
                      <div className="skeleton-cell h-5 rounded bg-gradient-to-r from-[#0F172A]/5 via-[#0F172A]/10 to-[#0F172A]/5 bg-[length:200%_100%]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F8FAFC] font-semibold">
              <tr>
                {Array(6).fill(0).map((_, i) => (
                  <td key={i} className="p-3">
                    <div className="skeleton-cell h-5 rounded bg-gradient-to-r from-[#0F172A]/5 via-[#0F172A]/10 to-[#0F172A]/5 bg-[length:200%_100%]" />
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  const totals = data.reduce(
    (a, c) => ({
      red: a.red + c.red,
      yellow: a.yellow + c.yellow,
      blue: a.blue + c.blue,
      white: a.white + c.white
    }),
    { red: 0, yellow: 0, blue: 0, white: 0 }
  );

  const grandTotal = totals.red + totals.yellow + totals.blue + totals.white;

  return (
    <div className="mt-4 flex justify-center fade-in">
      <div className="w-full max-w-4xl overflow-x-auto border border-[#0F172A]/10 rounded-lg bg-white/60 backdrop-blur">
        <table className="w-full text-sm table-auto text-[#0F172A]">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Red</th>
              <th className="p-3">Yellow</th>
              <th className="p-3">Blue</th>
              <th className="p-3">White</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-b border-[#0F172A]/10">
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.red}</td>
                <td className="p-3">{r.yellow}</td>
                <td className="p-3">{r.blue}</td>
                <td className="p-3">{r.white}</td>
                <td className="p-3 font-semibold text-[#1E40AF]">
                  {r.red + r.yellow + r.blue + r.white}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#F8FAFC] font-semibold">
            <tr>
              <td className="p-3">Total</td>
              <td className="p-3">{totals.red}</td>
              <td className="p-3">{totals.yellow}</td>
              <td className="p-3">{totals.blue}</td>
              <td className="p-3">{totals.white}</td>
              <td className="p-3 text-[#1E40AF]">{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WasteTable;