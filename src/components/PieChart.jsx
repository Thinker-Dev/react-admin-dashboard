import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pie, setPie] = useState([]);
  let pieData = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/charts/pie")
      .then((res) => {
        console.log(res.data);
        setPie(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const mockPieData = [
    {
      id: "jan",
      label: "jan",
      value: pie.jan,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "fev",
      label: "fev",
      value: pie.feb,
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "mar",
      label: "mar",
      value: pie.mar,
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "abr",
      label: "abr",
      value: pie.apr,
      color: "hsl(229, 70%, 50%)",
    },
    {
      id: "mai",
      label: "mai",
      value: pie.may,
      color: "hsl(344, 70%, 50%)",
    },
    {
      id: "jun",
      label: "jun",
      value: pie.jun,
      color: "hsl(344, 70%, 50%)",
    },
    {
      id: "jul",
      label: "jul",
      value: pie.jul,
      color: "hsl(120, 52.34042553191489%, 46.07843137254902%)",
    },
    {
      id: "aug",
      label: "ago",
      value: pie.aug,
      color: "hsl(28.932806324110672, 100%, 49.6078431372549%)",
    },
    {
      id: "set",
      label: "set",
      value: pie.sep,
      color: "hsl(344.40000000000003, 92.59259259259261%, 89.41176470588235%)",
    },
    {
      id: "out",
      label: "out",
      value: pie.oct,
      color: "hsl(295.29411764705884, 89.47368421052633%, 11.176470588235293%)",
    },
    {
      id: "nov",
      label: "nov",
      value: pie.nov,
      color: "hsl(194.01869158878503, 100%, 41.96078431372549%)",
    },
    {
      id: "dec",
      label: "dez",
      value: pie.dec,
      color: "hsl(140.0943396226415, 83.46456692913385%, 49.80392156862745%)",
    },
  ];
  return (
    <ResponsivePie
      data={mockPieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
