import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const pieChartData = [
  { name: "Food", value: 30 },
  { name: "Medicine", value: 40 },
  { name: "Toys", value: 10 },
  { name: "Bathroom Essentials", value: 15 },
  { name: "Grooming Equipments", value: 5 },
];

const barChartData = [
  { name: "Food", pv: 50 },
  { name: "Medicine", pv: 60 },
  { name: "Toys", pv: 25 },
  { name: "Bathroom Essentials", pv: 35 },
  { name: "Grooming Equipments", pv: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF00FF"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', margin: '20px' }}>
      <div style={{ alignSelf: 'flex-end' }}>
        <BarChart
          width={500}
          height={300}
          data={barChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#E5A700" background={{ fill: '#eee' }} />
        </BarChart>
      </div>
      
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}

export default App;
