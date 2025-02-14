// "use client";
// import React, { useState } from "react";
// import { usePapaParse } from "react-papaparse";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import { Input } from "@/components/ui/input";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

// const CSVVisualizer = () => {
//   const [csvData, setCsvData] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const { readString } = usePapaParse();

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = ({ target }) => {
//       readString(target.result, {
//         header: true,
//         dynamicTyping: true,
//         complete: (results) => setCsvData(results.data.filter(row => Object.values(row).some(val => val !== ""))),
//       });
//     };
//     reader.readAsText(file);
//   };

//   const getNumericColumns = () => {
//     if (!csvData || csvData.length === 0) return [];
//     const keys = Object.keys(csvData[0]);
//     return keys.filter(key => csvData.every(row => typeof row[key] === "number"));
//   };

//   const extractChartData = (numericKey) => {
//     if (!csvData || csvData.length === 0) return [];
//     const keys = Object.keys(csvData[0]);
//     const categoryKey = keys.find(key => key !== numericKey) || keys[0];
//     return csvData.map(row => ({ name: String(row[categoryKey]), value: row[numericKey] }));
//   };

//   const numericColumns = getNumericColumns();

//   return (
//     <div className="p-4 space-y-4 text-gray-900 dark:text-gray-100">
//       <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md mx-auto">
//         <label className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition">
//           <Input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
//           <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">📂 Choose a file</span>
//         </label>

//         <button
//           onClick={() => setShowPreview(true)}
//           className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
//         >
//           👀 Visualize
//         </button>
//       </div>

//       {showPreview && csvData && numericColumns.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {numericColumns.map((col, index) => (
//             <div key={index} className="space-y-4">
//               <h2 className="text-xl font-semibold">{col} Visualization</h2>

//               {/* Pie Chart */}
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={extractChartData(col)} dataKey="value" nameKey="name" fill="#8884d8" label>
//                     {extractChartData(col).map((_, idx) => (
//                       <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
//                 </PieChart>
//               </ResponsiveContainer>

//               {/* Bar Chart */}
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={extractChartData(col)}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                   <XAxis dataKey="name" stroke="#ccc" />
//                   <YAxis stroke="#ccc" />
//                   <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
//                   <Legend />
//                   <Bar dataKey="value" fill="#82ca9d" />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* Line Chart */}
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={extractChartData(col)}>
//                   <XAxis dataKey="name" stroke="#ccc" />
//                   <YAxis stroke="#ccc" />
//                   <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
//                   <Legend />
//                   <Line type="monotone" dataKey="value" stroke="#8884d8" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CSVVisualizer;

"use client";
import React, { useState } from "react";
import { usePapaParse } from "react-papaparse";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Input } from "@/components/ui/input";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B"];

const CSVVisualizer = () => {
  const [csvData, setCsvData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { readString } = usePapaParse();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      readString(target.result, {
        header: true,
        dynamicTyping: true,
        complete: (results) => setCsvData(results.data.filter(row => Object.values(row).some(val => val !== ""))),
      });
    };
    reader.readAsText(file);
  };

  const getNumericColumns = () => {
    if (!csvData || csvData.length === 0) return [];
    const keys = Object.keys(csvData[0]);
    return keys.filter(key => csvData.every(row => typeof row[key] === "number"));
  };

  const extractChartData = (numericKey) => {
    if (!csvData || csvData.length === 0) return [];
    const keys = Object.keys(csvData[0]);
    const categoryKey = keys.find(key => key !== numericKey) || keys[0];
    return csvData.map(row => ({ name: String(row[categoryKey]), value: row[numericKey] }));
  };

  const numericColumns = getNumericColumns();

  return (
    // <div className="p-4 space-y-4 bg-background text-foreground">
    //   <div className="flex flex-col items-center gap-4 p-6 bg-card shadow-lg rounded-lg w-full max-w-md mx-auto">
    //     <label className="w-full flex items-center justify-center px-4 py-2 bg-muted border border-border rounded-lg shadow-sm cursor-pointer hover:bg-muted/70 transition">
    //       <Input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
    //       <span className="text-foreground font-medium flex items-center gap-2">📂 Choose a file</span>
    //     </label>

    //     <button
    //       onClick={() => setShowPreview(true)}
    //       className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition"
    //     >
    //       👀 Visualize
    //     </button>
    //   </div>

    //   {showPreview && csvData && numericColumns.length > 0 && (
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //       {numericColumns.map((col, index) => (
    //         <div key={index} className="space-y-4">
    //           <h2 className="text-xl font-semibold">{col} Visualization</h2>

    //           {/* Pie Chart */}
    //           <ResponsiveContainer width="100%" height={300}>
    //             <PieChart>
    //               <Pie data={extractChartData(col)} dataKey="value" nameKey="name" fill="#8884d8" label>
    //                 {extractChartData(col).map((_, idx) => (
    //                   <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
    //                 ))}
    //               </Pie>
    //               <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
    //             </PieChart>
    //           </ResponsiveContainer>

    //           {/* Bar Chart */}
    //           <ResponsiveContainer width="100%" height={300}>
    //             <BarChart data={extractChartData(col)}>
    //               <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
    //               <XAxis dataKey="name" stroke="var(--foreground)" />
    //               <YAxis stroke="var(--foreground)" />
    //               <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
    //               <Legend />
    //               <Bar dataKey="value" fill={COLORS[index % COLORS.length]} />
    //             </BarChart>
    //           </ResponsiveContainer>

    //           {/* Line Chart */}
    //           <ResponsiveContainer width="100%" height={300}>
    //             <LineChart data={extractChartData(col)}>
    //               <XAxis dataKey="name" stroke="var(--foreground)" />
    //               <YAxis stroke="var(--foreground)" />
    //               <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
    //               <Legend />
    //               <Line type="monotone" dataKey="value" stroke={COLORS[index % COLORS.length]} />
    //             </LineChart>
    //           </ResponsiveContainer>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="p-4 space-y-4 bg-background text-foreground">
  <div className="flex flex-col items-center gap-4 p-6 bg-card shadow-lg rounded-lg w-full max-w-md mx-auto">
    <label className="w-full flex items-center justify-center px-4 py-2 bg-muted border border-border rounded-lg shadow-sm cursor-pointer hover:bg-muted/70 transition">
      <Input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
      <span className="text-foreground font-medium flex items-center gap-2">📂 Choose a file</span>
    </label>

    <button
      onClick={() => setShowPreview(true)}
      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition"
    >
      👀 Visualize
    </button>
  </div>

  {showPreview && csvData && numericColumns.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {numericColumns.map((col, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-semibold">{col} Visualization</h2>

          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={extractChartData(col)} dataKey="value" nameKey="name" fill="#8884d8" label>
                {extractChartData(col).map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
            </PieChart>
          </ResponsiveContainer>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={extractChartData(col)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--foreground)" />
              <YAxis stroke="var(--foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
              <Legend />
              <Bar dataKey="value" fill={COLORS[index % COLORS.length]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={extractChartData(col)}>
              <XAxis dataKey="name" stroke="var(--foreground)" />
              <YAxis stroke="var(--foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={COLORS[index % COLORS.length]} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default CSVVisualizer;
