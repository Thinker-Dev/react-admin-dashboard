import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Camioes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "mat",
      headerName: "Matricula",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cap",
      headerName: "Capacidade(kg)",
      flex: 1,
    },
    {
      field: "nvlRef",
      headerName: "Nivel de Refrigeração",
      flex: 1,
    },
  ];
  const [camioes, setCamioes] = useState([]);
  let cam_data = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/camiao")
      .then((res) => {
        console.log(res.data);
        setCamioes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  camioes.forEach((cam) => {
    cam_data = [
      ...cam_data,
      {
        id: cam.cam_codigo,
        mat: cam.cam_matricula,
        cap: cam.cam_capacidade,
        nvlRef: cam.cam_nivel_refrigeracao,
      },
    ];
  });
  return (
    <Box m="20px">
      <Header title="CAMIÕES" subtitle="Lista de Camiões" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={cam_data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Camioes;
