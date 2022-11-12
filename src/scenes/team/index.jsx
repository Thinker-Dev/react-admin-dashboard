import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      headerName: "armazem",
      flex: 1,
    },

    {
      field: "contacto",
      headerName: "contacto",
      flex: 1,
    },
    // {
    //   field: "accessLevel",
    //   headerName: "Nivel de Acesso",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];
  const [funcionarios, setFuncionarios] = useState([]);
  let func_data = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/funcionario")
      .then((res) => {
        console.log(res.data);
        setFuncionarios(res.data);
      })
      .catch((err) => console.log(err));

    console.log("this is funcionarios", funcionarios);
  }, []);

  funcionarios.forEach((func) => {
    func_data = [
      ...func_data,
      {
        id: func.func_codigo,
        nome: func.func_nome,
        armazem: func.arm_codigo,
        contacto: func.contactos[0]?.telefone,
      },
    ];
  });
  return (
    <Box m="20px">
      <Header title="FUNCIONARIOS" subtitle="Gestão de Funcionarios" />
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
        <DataGrid checkboxSelection rows={func_data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
