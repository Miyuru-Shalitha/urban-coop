import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

interface Supplier {
    category: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF00FF"];

const SupplierManagementDashboard = () => {

    const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        fetchSupplierData();
    }, []);

    const fetchSupplierData = async () => {
        try {
            const response = await axios.get<Supplier[]>("http://localhost:5000/api/suppliers");
            const suppliers = response.data;

            const categories: { [category: string]: number } = {};
            suppliers.forEach((supplier) => {
                categories[supplier.category] = (categories[supplier.category] || 0) + 1;
            });

            const pieChartData = Object.keys(categories).map((category) => ({
                name: category,
                value: categories[category],
            }));

            setPieChartData(pieChartData);
        } catch (error) {
            console.error("Error fetching supplier data:", error);
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
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Supplier Types</h1>
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default SupplierManagementDashboard;
