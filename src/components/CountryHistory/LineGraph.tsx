import React from "react";
import { Line } from "react-chartjs-2";
import { Colors } from "./colors";
import { randomIntFromInterval } from "../CoronaImage/allCoronaImage";

interface Props {
  renderData: any;
  labels: string[];
  height?: number;
}

const defaultConfig = {
  fill: false,
  lineTension: 0.1,
  pointHoverRadius: 5,
  borderDashOffset: 2,
  pointRadius: 0,
  borderWidth: 2,
  pointHitRadius: 10,
};

const LineChart = (props: Props) => {
  const { renderData, labels, height } = props;

  const completeDataSet = renderData.map((el: any) => {
    const randomNumber = randomIntFromInterval(0, 100);
    return {
      label: el.countryName,
      backgroundColor: Colors[randomNumber],
      borderColor: Colors[randomNumber],
      pointBorderColor: Colors[randomNumber],
      pointHoverBorderColor: Colors[randomNumber],
      data: el.count,
      ...defaultConfig,
    };
  });

  const lineChartData = {
    labels: labels,
    datasets: completeDataSet,
  };

  return (
    <Line
      data={lineChartData}
      height={height || 200}
      options={{
        animation: {
          easing: "easeInOutBack",
        },
        title: {
          display: false,
        },
        // legend: {
        //   display: false,
        // },
        // tooltips: {
        //   mode: "nearest",
        //   intersect: false,
        //   custom: function (tooltip) {
        //     if (!tooltip) return;
        //     tooltip.displayColors = false;
        //   },
        //   callbacks: {
        //     title: function () {
        //       return "";
        //     },
        //     label: function (tooltipItem) {
        //       return tooltipItem.value ? tooltipItem.value : "";
        //     },
        //   },
        // },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                parser: "DD MMM YYY",
                unit: "day",
                displayFormats: {
                  day: "DD MMM",
                },
              },
              ticks: {
                maxTicksLimit: 7, // https://stackoverflow.com/questions/37250456/chart-js-evenly-distribute-ticks-when-using-maxtickslimit
                maxRotation: 0,
                minRotation: 0,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                maxTicksLimit: 5.5,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: true,
      }}
    />
  );
};

export default LineChart;
