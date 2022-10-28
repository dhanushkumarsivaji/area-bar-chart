import React from "react";
import Highcharts from "highcharts";
import { renderToStaticMarkup } from "react-dom/server";
import HighchartsReact from "highcharts-react-official";
import HC_rounded from "highcharts-rounded-corners";
import highchartsAnnotations from "highcharts/modules/annotations";
import DataLabel from "./dataLabel";

highchartsAnnotations(Highcharts);
HC_rounded(Highcharts);

export default function BarChart() {
  const options = {
    chart: {
      // height: "500px"
    },
    title: {
      text: ""
    },
    xAxis: {
      labels: {
        enabled: false
      }
    },
    yAxis: {
      // opposite: true,
      title: {
        margin: 40,
        enabled: false,
        text: "Your Proposed Portfolio Holdings",
        style: {
          fontWeight: "bold"
        }
      }
    },
    annotations: [
      {
        draggable: "",
        labelOptions: {
          backgroundColor: "none",
          shape: "none",
          borderWidth: 0
        },
        labels: [
          {
            point: {
              x: 9,
              y: 21,
              xAxis: 0,
              yAxis: 0
            },

            useHTML: true,
            formatter: function () {
              return renderToStaticMarkup(
                <DataLabel header="2026" color="#000000" />
              );
            }
          }
        ]
      }
    ],
    // colors: ["#009933", "black"],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        pointPadding: 0,
        groupPadding: 0.02,
        // zones: [
        //   {
        //     value: 10, // Values up to 10 (not including) ...
        //     color: "#00BFB3" // ... have the color blue.
        //   },
        //   {
        //     color: "#6730E3" // Values from 10 (including) and up have the color red
        //   }
        // ],
        dataLabels: {
          enabled: true,
          color: "black",
          align: "right",
          // format: "{x} {y} d",
          inside: false,
          useHTML: true,
          formatter: function () {
            if (this.y > 10) {
              return (
                '<span style="color: white">' +
                this.key +
                "<br/>" +
                this.y +
                "%</span>"
              );
            } else {
              return (
                '<span style="color: black">' +
                this.key +
                "<br/>" +
                this.y +
                "%</span>"
              );
            }
          },
          style: {
            fontWeight: "bold"
          },
          verticalAlign: "middle"
        }
      },
      series: {
        borderRadiusTopLeft: "10%",
        borderRadiusTopRight: "10%",
        borderRadiusBottomLeft: "10%",
        borderRadiusBottomRight: "10%"
      }
    },

    series: [
      {
        data: [
          { name: "BAR 1", y: 18.6, color: "#6730E3" },
          { name: "BAR 2", y: 2.3, color: "#6730E3" },
          { name: "BAR 3", y: 13.9, color: "#6730E3" },
          { name: "BAR 4", y: 4.5, color: "#6730E3" },
          { name: "BAR 5", y: 1.3, color: "#6730E3" },
          { name: "BAR 6", y: 21.8, color: "#00BFB3" },
          { name: "BAR 7", y: 22.1, color: "#00BFB3" },
          { name: "BAR 8", y: 0.6, color: "#00BFB3" },
          { name: "BAR 9", y: 13, color: "#00BFB3" },
          { name: "BAR 10", y: 2, color: "#00BFB3" }
        ],
        type: "bar",
        colorByPoint: true
      }
    ]
  };

  return (
    <div className="barChart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
