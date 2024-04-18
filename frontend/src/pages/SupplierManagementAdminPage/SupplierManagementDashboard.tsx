import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, PieChart, Pie } from "recharts";

const barChartData = [
    { category: "Food", suppliers: 8 },
    { category: "Medicine", suppliers: 5 },
    { category: "Toys", suppliers: 7 },
    { category: "Bathroom Essentials", suppliers: 3 },
    { category: "Grooming Equipments", suppliers: 4 },
];

const pieChartData = [
    { name: "Food", value: 8 },
    { name: "Medicine", value: 5 },
    { name: "Toys", value: 7 },
    { name: "Bathroom Essentials", value: 3 },
    { name: "Grooming Equipments", value: 4 },
];

export default function SupplierManagementDashboard() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">The Supplier types</h1>
                <div className="w-full md:w-3/4 mx-auto">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#E5A700"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
            <div className="md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">The Suppliers of Urban Coop</h1>
                <div className="w-full md:w-3/4 mx-auto">
                    <BarChart
                        width={400}
                        height={400}
                        data={barChartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="suppliers" fill="#E5A700" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}
