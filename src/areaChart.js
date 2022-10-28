/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Highcharts, { Chart as HighchartsChart } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import highchartsAnnotations from 'highcharts/modules/annotations';
import DataLabel from './dataLabel';
import Label from './label';


highchartsMore(Highcharts);
highchartsAnnotations(Highcharts);

const GlidePathMolecule = ({data: {
  xAxisCategories,
  sectionOnePosition,
  sectionTwoPosition,
  sectionTwoData,
  sectionOneData,
  seriesData,
  theme,
  translation,
  pieChartFontSize,
}, chartHeight = 500, showAmount = false}) => {


  const [_, setChart] = useState(null);

  const chartRef = useRef(null);

  const callback = useCallback((HighchartsChart) => {
    setChart(HighchartsChart);
  }, []);

  const options = {
    chart: {
      marginTop: showAmount ? 12 : 0,
      // marginTop: 0,

    },
    title: showAmount ?
      {
        text: 'Allocation (%)',
        align: 'left',
        margin: 30,
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#000000'
        }
      } :
      {
        text: ''
      },
    subtitle: {
      text: ''
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: xAxisCategories,
      lineColor: theme.palette.common.black,
      lineWidth: 2,
      labels: {
        // rotation: 0,
      },
      title: {
        enabled: false
      } 
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        enabled: true
      },
      endOnTick: false
    },

    annotations: [
      {
        draggable: '',
        labelOptions: {
          backgroundColor: 'none',
          shape: 'none',
          borderWidth: 0
        },
        labels: [
          {
            point: {
              x: 0,
              y: sectionOnePosition,
              xAxis: 0,
              yAxis: 0
            },

            useHTML: true,
            formatter() {
              return renderToStaticMarkup(
                <DataLabel
                  header={translation.equity_header}
                  subHeader={translation.equity_sub_header}
                  color={theme.palette.charts.glidePath.label.equity}
                />
              );
            }
          },
          {
            point: {
              x: sectionTwoPosition,
              y: 0,
              xAxis: 0,
              yAxis: 0
            },
            useHTML: true,
            formatter() {
              return renderToStaticMarkup(
                <DataLabel
                  header={translation.fixed_income_header}
                  subHeader={translation.fixed_income_sub_header}
                  alignment
                  color={theme.palette.charts.glidePath.label.fixedIncome}
                />
              );
            }
          }
        ]
      }
    ],
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          radius: 2.5,
          fillColor: 'white',
          lineColor: theme.palette.charts.glidePath.line,
          lineWidth: 2,
          zIndex: 10000
        },
        states: {
          hover: {
            enabled: false,
            halo: {
              size: 0
            }
          }
        },
        point: {
          events: {
            mouseOver(event) {
              const { chart } = this.series;
              const r = chart.renderer;
              const left = chart.plotLeft;
              const top = chart.plotTop;
              const height = chart.plotHeight;
              const x = this.plotX;
              const y = this.plotY;

              if ((this.series.options).enabledCrosshairs && x && y) {
                (chart).crosshair = r
                  .path(['M', left + x, top + height, 'L', left + x, y + top])
                  .attr({
                    'stroke-width': 1,
                    stroke: 'black',
                    zIndex: 5
                  })
                  .add();
              }

              if (event) {

                if (chartRef !== null && (chartRef).current.chart.get('pie-chart')) {
                  (chartRef).current.chart.get('pie-chart').remove();
                }
                chart.addSeries({
                  type: 'pie',
                  id: 'pie-chart',
                  center: [(event?.target)?.plotX - 20, (event?.target)?.plotY - 20],
                  innerSize: '70%',
                  size: '10%',
                  zIndex: 100000,
                  dataLabels: {
                    enabled: true,
                    connectorWidth: 0,
                    connectorPadding: -10,
                    distance: 15,
                    useHTML: true,
                    formatter() {
                      return renderToStaticMarkup(
                        <Label
                          equity={this.key}
                          fixedIncome={this.y}
                          color={this.color}
                          pieChartFontSize={pieChartFontSize}
                        />
                      );
                    }
                  },
                  data: [
                    {
                      name: translation.fixed_income_header,
                      y: 100 - (event?.target)?.y,
                      color: theme.palette.charts.glidePath.pie.fixedIncome
                    },
                    {
                      name: translation.equity_header,
                      y: (event?.target)?.y,
                      color: theme.palette.charts.glidePath.pie.equity
                    }
                  ]
                });
              }
            },
            mouseOut() {
              const { chart } = this.series;
              if ((chart).crosshair) (chart).crosshair.destroy();
            }
          }
        },
        events: {
          mouseOut() {
            if (chartRef !== null && (chartRef).current.chart.get('pie-chart')) {
              (chartRef).current.chart.get('pie-chart').remove();
            }
          }
        }
      }
    },

    tooltip: {
      enabled: false
    },

    series: [
      {
        type: 'arearange',
        name: translation.fixed_income_header,
        enableMouseTracking: false,
        color: theme.palette.charts.glidePath.fixedIncome,
        marker: {
          enabled: false
        },
        data: sectionTwoData,
        zIndex: 1
      },
      {
        type: 'arearange',
        name: translation.equity_header,
        marker: {
          enabled: false
        },
        color: theme.palette.charts.glidePath.equity,
        enableMouseTracking: false,
        data: sectionOneData,
        zIndex: 2
      },
      {
        stickyTracking: false,
        color: theme.palette.charts.glidePath.line,
        type: 'line',
        enabledCrosshairs: true,
        data: seriesData,
        lineWidth: 2,
        zIndex: 5000000
      }
    ]
  };

  return (
    <>
      {options && xAxisCategories && sectionTwoData && seriesData && sectionOneData && (
        <>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            callback={callback}
            ref={chartRef}
          />
        </>
      )}
    </>
  );
};

export default GlidePathMolecule;
