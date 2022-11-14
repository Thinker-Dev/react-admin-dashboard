import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Armazens = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  const [armazens, setArmazens] = useState([]);
  let arm_data = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/armazem")
      .then((res) => {
        console.log(res.data);
        setArmazens(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  armazens.forEach((arm) => {
    arm_data = [
      ...arm_data,
      {
        id: arm.arm_codigo,
        name: arm.arm_nome,
      },
    ];
  });
  return (
    <Box m="20px">
      <Header title="ARMAZENS" subtitle="Lista de Armazens" />
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
        <DataGrid rows={arm_data} columns={columns} />
      </Box>
    </Box>
  );
};
export default Armazens;
