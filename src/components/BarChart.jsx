import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [leg, setLegumes] = useState([]);
  const [vegetais, setVegetais] = useState([]);
  const [frutas, setFrutas] = useState([]);
  const [disponiveis, setDisponives] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/charts/bar/vegetais")
      .then((res) => {
        console.log(res.data);
        setVegetais(res.data);
        setDisponives(true);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/charts/bar/legumes")
      .then((res) => {
        console.log(res.data);
        setLegumes(res.data);
        setDisponives(true);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/charts/bar/frutas")
      .then((res) => {
        console.log(res.data);
        setFrutas(res.data);
        setDisponives(true);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {}, [disponiveis]);

  const mockBarData = [
    {
      month: "jan",
      legumes: leg.jan?.[0]?.total ? leg.jan?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.jan?.[0]?.total ? frutas.jan?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.jan?.[0]?.total ? vegetais.jan?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "fev",
      legumes: leg.feb?.[0]?.total ? leg.feb?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.feb?.[0]?.total ? frutas.feb?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.feb?.[0]?.total ? vegetais.feb?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "mar",
      legumes: leg.mar?.[0]?.total ? leg.mar?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.mar?.[0]?.total ? frutas.feb?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.mar?.[0]?.total ? vegetais.mar?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "abr",
      legumes: leg.apr?.[0]?.total ? leg.apr?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.apr?.[0]?.total ? frutas.apr?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.apr?.[0]?.total ? vegetais.apr?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "may",
      legumes: leg.may?.[0]?.total ? leg.may?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.may?.[0]?.total ? frutas.may?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.may?.[0]?.total ? vegetais.may?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "jun",
      legumes: leg.jun?.[0]?.total ? leg.jun?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.jun?.[0]?.total ? frutas.jun?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.jun?.[0]?.total ? vegetais.jun?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "jul",
      legumes: leg.jul?.[0]?.total ? leg.jul?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.jul?.[0]?.total ? frutas.jul?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.jul?.[0]?.total ? vegetais.jul?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "ago",
      legumes: leg.aug?.[0]?.total ? leg.aug?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas.aug?.[0]?.total ? frutas.aug?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais.aug?.[0]?.total ? vegetais.mar?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "set",
      legumes: leg?.sep?.[0]?.total ? leg.sep?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas?.sep?.[0]?.total ? frutas.sep?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais?.sep?.[0]?.total ? vegetais.sep?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "out",
      legumes: leg?.oct?.[0]?.total ? leg.oct?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas?.oct?.[0]?.total ? frutas.oct?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais?.oct?.[0]?.total ? vegetais.oct?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "nov",
      legumes: leg?.nov?.[0]?.total ? leg.nov?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas?.nov?.[0]?.total ? frutas.nov?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais?.nov?.[0]?.total ? vegetais.nov?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
    {
      month: "dez",
      legumes: leg?.dec?.[0]?.total ? leg.dec?.[0]?.total : 0,
      legumesColor: "hsl(229, 70%, 50%)",
      frutas: frutas?.dec?.[0]?.total ? frutas.dec?.[0]?.total : 0,
      frutasColor: "hsl(296, 70%, 50%)",
      vegetais: vegetais?.dec?.[0]?.total ? vegetais.dec?.[0]?.total : 0,
      vegetaisColor: "hsl(97, 70%, 50%)",
    },
  ];

  return (
    <ResponsiveBar
      data={disponiveis === true ? mockBarData : []}
      theme={{
        // added
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
      keys={["legumes", "frutas", "vegetais"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
