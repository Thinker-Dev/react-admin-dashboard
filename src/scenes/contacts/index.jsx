import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clientes, setClientes] = useState([]);
  let cli_data = [];
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "contacto",
      headerName: "Numero de Celular",
      flex: 1,
    },
    {
      field: "endereco",
      headerName: "Endereço",
      flex: 1,
    },
  ];
  useEffect(() => {
    axios
      .get("http://localhost:8000/cliente")
      .then((res) => {
        console.log(res.data);
        setClientes(res.data);
      })
      .catch((err) => console.log(err));

    console.log("this is clientes", clientes);
  }, []);

  clientes.forEach((cli) => {
    cli_data = [
      ...cli_data,
      {
        id: cli.cli_codigo,
        nome: cli.cli_nome,
        endereco: cli.cli_endereco,
        contacto: cli.contactos[0]?.contacto,
      },
    ];
  });

  return (
    <Box m="20px">
      <Header title="CLIENTES" subtitle="Lista de Clientes" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={cli_data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
