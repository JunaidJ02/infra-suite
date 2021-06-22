
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const data = [
 { name: "OptiPlex 7050", value: 8525 },
 { name: "OptiPlex 5070", value: 3876 },
 { name: "OptiPlex 7040",value: 2559},
 { name: "OptiPlex 5060",value: 2386 },
 { name: "Latitude 7490", value: 2208 },
 { name: "Latitude 5400", value: 1944 },
 { name: "Latitude 7480", value: 1397 },
 { name: "Latitude 5410", value: 1090 },
 { name: "OptiPlex 9020", value: 1005 },
 { name: "OptiPlex 3080", value: 756 },
 { name: "Latitude 7290", value: 389 },
 { name: "Latitude E7470", value: 337 },
 { name: "Latitude 7280", value: 142 },
 { name: "OptiPlex 9020M", value: 141 },
 { name: "Latitude E7450", value: 81 },
 { name: "OptiPlex 7010", value: 80 },
 { name: "Latitude 5290 2-in-1", value: 64 },
 { name: "Latitude 7200 2-in-1", value: 43 },
 { name: "Latitude 5420", value: 33 },
 { name: "Latitude E7270", value: 20 },
 { name: "OptiPlex 5080", value: 15 },
 { name: "Latitude 7414", value: 12 },
 { name: "Latitude E7250", value: 8 },
 { name: "OptiPlex 790", value: 7 },
 { name: "Latitude E7440", value: 5 },
 { name: "OptiPlex 780", value: 2 },
 { name: "OptiPlex 7050-China HDD Protection", value: 1 },
 { name: "OptiPlex 760", value: 1 },
 { name: "Latitude E7240", value: 1 },
 { name: "OptiPlex 3060", value: 1 }

];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={100}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
