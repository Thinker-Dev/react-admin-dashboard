import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [produtos, setProdutos] = useState([]);
  let prod_data = [];
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "armazem",
      headerName: "Armazem",
      flex: 1,
    },
    {
      field: "categoria",
      headerName: "categoria",
      flex: 1,
    },
    {
      field: "prazo",
      headerName: "prazo de validade",
      flex: 1,
    },
    // {
    //   field: "cost",
    //   headerName: "Preço",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography color={colors.greenAccent[500]}>
    //       ${params.row.cost}
    //     </Typography>
    //   ),
    // },
  ];
  useEffect(() => {
    axios
      .get("http://localhost:8000/produto")
      .then((res) => {
        console.log(res.data);
        setProdutos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  produtos.forEach((prod) => {
    prod_data = [
      ...prod_data,
      {
        id: prod.prod_codigo,
        nome: prod.prod_nome,
        armazem: prod.armazem?.arm_nome,
        categoria: prod.categoria?.cat_nome,
        prazo: prod.prod_prazo_validade,
      },
    ];
  });

  return (
    <Box m="20px">
      <Header title="PRODUTOS" subtitle="Lista de Produtos" />
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
        <DataGrid checkboxSelection rows={prod_data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
