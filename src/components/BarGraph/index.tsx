import React from "react";
import { Bar } from "react-chartjs-2";

interface BarGraphInterface {
  label: string[];
  value: number[];
  height?: number;
}

const BarGraph = (props: BarGraphInterface) => {
  const { label, value, height } = props;
  const data = {
    labels: label,
    datasets: [
      {
        backgroundColor: "#b5f2f2",
        borderColor: "#b5f2f2",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: value,
      },
    ],
  };

  return (
    <Bar
      data={data}
      height={height || 400}
      options={{
        title: {
          display: false,
        },
        animation: {
          easing: "easeInOutBack",
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: "nearest",
          intersect: false,
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.value ? tooltipItem.value : "";
            },
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                maxRotation: 70,
                minRotation: 70,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default BarGraph;
