import "./style.css";
import AreaChart from "./areaChart";
import BarChart from "./barChart";

const data = {
  xAxisCategories: [
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
  ],
  sectionOnePosition: 80,
  sectionTwoPosition: 10,
  sectionTwoData: [
    [0, 40],
    [0, 40],
    [0, 40],
    [0, 40],
    [0, 40],
    [0, 40],
    [0, 30],
    [0, 30],
    [0, 20],
    [0, 20],
    [0, 20],
    [0, 15],
  ],
  sectionOneData: [
    [40, 80],
    [40, 80],
    [40, 80],
    [40, 80],
    [40, 80],
    [40, 80],
    [30, 80],
    [30, 80],
    [20, 80],
    [20, 80],
    [20, 80],
    [15, 80],
  ],
  seriesData: [
    {
      y: 40,
    },
    {
      y: 40,
    },
    {
      y: 40,
    },
    {
      y: 40,
    },
    {
      y: 40,
    },
    {
      y: 40,
    },
    {
      y: 30,
    },
    {
      y: 30,
    },
    {
      y: 20,
    },
    {
      y: 20,
    },
    {
      y: 20,
    },
    {
      y: 15,
    },
  ],
  theme: {
    palette: {
      mode: "light",
      common: {
        black: "#000000",
        white: "#FFFFFF",
      },
      charts: {
        glidePath: {
          equity: "#B39AF5",
          fixedIncome: "#72DBD5",
          pie: {
            equity: "#6730E3",
            fixedIncome: "#00BFB3",
          },
          line: "#086bf7",
          label: {
            equity: "#6730E3",
            fixedIncome: "#00BFB3",
          },
        },
        portfolioComposition: {
          equity: "#6730E3",
          fixedIncome: "#00BFB3",
        },
      },
    },
    shape: {
      borderRadius: 4,
    },
  },
  translation: {
    equity_header: "Section One",
    equity_sub_header: "reduce positions over time",
    fixed_income_header: "Section Two",
    fixed_income_sub_header: "increase positions over time",
  },
};

export default function App() {
  return (
    <div className="container">
      <div className="chart-container">
        <div className="area-chart">
          <AreaChart data={data} />
        </div>
        <div className="bar-chart">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
