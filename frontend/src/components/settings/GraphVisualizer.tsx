import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const GraphVisualizer = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").slice(1);
      const formattedData = rows.map((row) => {
        const [date, description, amount, balance] = row.split(",");
        return { date, description, amount: parseFloat(amount), balance: parseFloat(balance) };
      });
      setData(formattedData);
    };
    reader.readAsText(file);
  };

  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Amount",
        data: data.map((entry) => entry.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Balance",
        data: data.map((entry) => entry.balance),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">CSV Data Visualization</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="my-4" />
      <div className="flex space-x-4 my-4">
        <button onClick={() => setChartType("bar")} className="px-4 py-2 bg-blue-500 text-white rounded">Bar Chart</button>
        <button onClick={() => setChartType("line")} className="px-4 py-2 bg-green-500 text-white rounded">Line Chart</button>
        <button onClick={() => setChartType("pie")} className="px-4 py-2 bg-red-500 text-white rounded">Pie Chart</button>
      </div>
      {chartType === "bar" && <Bar data={chartData} />}
      {chartType === "line" && <Line data={chartData} />}
      {chartType === "pie" && <Pie data={chartData} />}
    </div>
  );
};

export default GraphVisualizer;
