import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

interface Item {
  category: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF00FF"];

const InventoryDashboard = () => {
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Item[]>(
        "http://localhost:5000/api/items"
      );
      const items = response.data;

      const categories: { [category: string]: number } = {};
      items.forEach((item) => {
        categories[item.category] = (categories[item.category] || 0) + 1;
      });

      const pieChartData = Object.keys(categories).map((category) => ({
        name: category,
        value: categories[category],
      }));

      setPieChartData(pieChartData);
    } catch (error) {
      console.error("Error fetching item data:", error);
      setPieChartData([]); // Reset pieChartData to an empty array in case of error
    }
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    
    <div className="flex flex-col md:flex-row justify-center items-center">
      <header
        style={{
          textAlign: "center",
          padding: "0px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: "0" }}>
          Inventory Management System
        </h1>
        <p style={{ fontSize: "1.2rem", margin: "10px 0 0 0" }}>
          A comprehensive tool to manage your inventory efficiently
        </p>
      </header>
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Inventory Categories</h1>
        <div>
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={150} // Increase the outerRadius for a larger pie chart
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
