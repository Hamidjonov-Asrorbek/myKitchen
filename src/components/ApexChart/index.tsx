import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexChartProps {
  series: number[];
  labels: string[];
  title: string;
}

class ApexChart extends React.Component<ApexChartProps> {
  state = {
    options: {
      chart: {
        width: 380,
        type: "donut" as const,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${Math.round(val)} %`,
      },
      fill: {
        type: "gradient" as const,
      },
      legend: {
        formatter: (val: string, opts: any) =>
          `${val} - ${opts.w.globals.series[opts.seriesIndex]} min`,
      },
      title: {
        text: this.props.title,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    } as ApexOptions,
  };

  render() {
    const { series, labels } = this.props;

    return (
      <div className="container flex items-center justify-center">
        <div id="chart">
          <ReactApexChart
            options={{ ...this.state.options, labels }}
            series={series}
            type="donut"
            width={380}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
