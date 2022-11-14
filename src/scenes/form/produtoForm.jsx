import * as React from "react";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
// import TextareaAutosize from '@mui/base/TextareaAutosize';

const ProdutoForm = () => {
  const categoria = [
    { label: "Vegetais", id: 1 },
    { label: "Frutas", id: 2 },
    { label: "Legumes", id: 3 },
  ];
  const prodExist = [
    { label: "Tomate", id: 1 },
    { label: "Banana", id: 2 },
    { label: "Arroz", id: 3 },
  ];

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:8000/produto", {
        prod_nome: values.nome,
        codigo_arm: values.cod_armazem,
        prod_prazo_validade: values.prazo_validade,
        codigo_cat: values.categoria,
      })
      .then((res) => {
        console.log("response", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Box m="20px">
      <Header title="ADICIONAR PRODUTO" subtitle="Crie um Produto novo" />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome do Produto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="codigo do armazem"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cod_armazem}
                name="cod_armazem"
                error={!!touched.cod_armazem && !!errors.cod_armazem}
                helperText={touched.cod_armazem && errors.cod_armazem}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prazo de validade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prazo_validade}
                name="prazo_validade"
                error={!!touched.prazo_validade && !!errors.prazo_validade}
                helperText={touched.prazo_validade && errors.prazo_validade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoria}
                name="categoria"
                label="Categoria"
                error={!!touched.categoria && !!errors.categoria}
                sx={{ gridColumn: "span 2" }}
                id="combo-box-demo"
                options={categoria}
              />
              {/* <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Descricao do Produto"
                                style={{ width: 400 }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.desc}
                                name="desc"
                                error={!!touched.desc && !!errors.desc}
                                helperText={touched.desc && errors.desc}
                                sx={{ gridColumn: "span 4" }}
                            /> */}
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Adicionar Produto
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("required"),
  categoria: yup.string().required("required"),
  cod_armazem: yup.string().required("required"),
  prazo_validade: yup.string(),
});
const initialValues = {
  nome: "",
  categoria: "",
  cod_armazem: "",
  prazo_validade: " ",
};

export default ProdutoForm;
