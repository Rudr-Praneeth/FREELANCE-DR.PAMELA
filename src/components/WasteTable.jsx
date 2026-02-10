import React from "react";

const WasteTable = ({ data }) => {
  const totals = data.reduce(
    (a, c) => ({
      red: a.red + c.red,
      yellow: a.yellow + c.yellow,
      blue: a.blue + c.blue,
      white: a.white + c.white
    }),
    { red: 0, yellow: 0, blue: 0, white: 0 }
  );

  const grandTotal =
    totals.red + totals.yellow + totals.blue + totals.white;

  return (
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-4xl overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
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
              <tr key={i} className="border-b border-white/5">
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.red}</td>
                <td className="p-3">{r.yellow}</td>
                <td className="p-3">{r.blue}</td>
                <td className="p-3">{r.white}</td>
                <td className="p-3 font-semibold">
                  {r.red + r.yellow + r.blue + r.white}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-white/5 font-semibold">
            <tr>
              <td className="p-3">Total</td>
              <td className="p-3">{totals.red}</td>
              <td className="p-3">{totals.yellow}</td>
              <td className="p-3">{totals.blue}</td>
              <td className="p-3">{totals.white}</td>
              <td className="p-3">{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WasteTable;
