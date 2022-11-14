import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Autocomplete from "@mui/material/Autocomplete";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserArmazem, selectUserId } from "../../features/user/userSlice";
const Vendas = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [tabdata, setTabdata] = useState([]);
  const [ent, setEnt] = useState(null);
  const [prodt, setProdt] = useState(null);
  const [cli, setCli] = useState(null);
  const [qnt, setQnt] = useState(null);
  const userId = useSelector(selectUserId);
  const [updated, setUpdated] = useState(false);
  let fullData = [];
  const handleFormSubmit = () => {
    if (!prodt) return window.alert("insira os dados de venda completos");
    if (!cli) return window.alert("insira os dados de venda completos");
    if (!ent) return window.alert("insira os dados de venda completos");
    if (Number(qnt) < 0)
      return window.alert("insira os dados de venda completos");
    axios
      .post("http://localhost:8000/encomenda", {
        codigo_cli: cli.id,
        codigo_func: userId,
        codigo_ent: ent.id,
        enc_data_prevista_entrega: ent.label,
        enc_estado: "pendente",
        codigo_prod: prodt.id,
        quantidade: qnt,
      })
      .then((res) => {
        console.log("response", res.data);
        setUpdated(!updated);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "produto",
      headerName: "produto",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cliente",
      headerName: "cliente",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "funcionario",
      headerName: "funcionario",
      flex: 1,
    },
    {
      field: "quantidade",
      headerName: "quantidade",
      flex: 1,
    },
    {
      field: "endereco",
      headerName: "endereco",
      flex: 1,
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/produto")
      .then((res) => {
        console.log(res.data);
        setProdutos(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/cliente")
      .then((res) => {
        console.log(res.data);
        setClientes(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/entrega")
      .then((res) => {
        console.log(res.data);
        setEntregas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  let options = [];
  let optionsCli = [];
  let optionsEnt = [];
  produtos.forEach((prod) => {
    options = [...options, { label: prod.prod_nome, id: prod.prod_codigo }];
  });
  clientes.forEach((cli) => {
    optionsCli = [...optionsCli, { label: cli.cli_nome, id: cli.cli_codigo }];
  });
  entregas.forEach((ent) => {
    optionsEnt = [...optionsEnt, { label: ent.ent_data, id: ent.ent_codigo }];
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/contem")
      .then((res) => {
        console.log(res.data);
        setTabdata(res.data);
      })
      .catch((err) => console.log(err));
  }, [updated]);
  tabdata.forEach((tab) => {
    fullData = [
      ...fullData,
      {
        id: tab.codigo_enc,
        produto: tab.produto.prod_nome,
        cliente: tab.encomenda.cliente.cli_nome,
        funcionario: tab.encomenda.funcionario.func_nome,
        quantidade: tab.quantidade,
        endereco: tab.encomenda.cliente.cli_endereco,
      },
    ];
  });
  return (
    <>
      <Box m="20px">
        <Header title="PAGINA DE VENDAS" subtitle="Venda alguns produtos" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Autocomplete
                  fullWidth
                  variant="filled"
                  options={options}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={(event, value) => setProdt(value)}
                  name="prod"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      values={values.prod}
                      label="Produto"
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  variant="filled"
                  options={optionsCli}
                  sx={{ gridColumn: "span 2" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onBlur={handleBlur}
                  onChange={(event, value) => setCli(value)}
                  name="cli"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      values={values.cli}
                      label="Cliente"
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  variant="filled"
                  options={optionsEnt}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ gridColumn: "span 2" }}
                  onBlur={handleBlur}
                  onChange={(event, value) => setEnt(value)}
                  name="ent"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={values.ent}
                      label="Entregas possiveis"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Quantidade"
                  onBlur={handleBlur}
                  onChange={(event) => setQnt(event.target.value)}
                  name="qnt"
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  onClick={handleFormSubmit}
                  color="secondary"
                  variant="contained"
                >
                  Adicionar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Box m="20px">
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
            rows={fullData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>

        <table style={{ width: "100%" }}>
          <tr style={{ textAlign: "right" }}>
            <th>IVA 17%</th>
            <th>SUB TOTAL</th>
          </tr>
          <tr style={{ textAlign: "right" }}>
            <td>140 MZN</td>
            <td>1556 MZN</td>
          </tr>
        </table>

        <Box display="flex" justifyContent="end" mt="30px">
          <Button type="submit" color="secondary" variant="contained">
            Confirmar
          </Button>
        </Box>
      </Box>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  prod: yup.string().required("required"),
  qnt: yup.string().required("required"),
  cli: yup.string().required("required"),
  ent: yup.string().required("required"),
});
const initialValues = {
  prod: "",
  qnt: "",
  cli: "",
  ent: "",
};

export default Vendas;
