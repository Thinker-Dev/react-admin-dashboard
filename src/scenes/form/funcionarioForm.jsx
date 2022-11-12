import * as React from "react";
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const FuncionarioForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log("this are values", values);
    const nome = values.firstName + " " + values.lastName;
    console.log("nome ", nome);

    axios
      .post("http://localhost:8000/funcionario", {
        func_nome: nome,
        arm_codigo: Number(values.codigo_armazem),
        contacto: values.contact1,
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
      <Header
        title="ADICIONAR FUNCIONARIO"
        subtitle="Crie um novo perfil de Funcioanrio"
      />
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
                label="Primeiro Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apelido"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Numero de Telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact1}
                name="contact1"
                error={!!touched.contact1 && !!errors.contact1}
                helperText={touched.contact1 && errors.contact1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Codigo do Armazem"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.codigo_armazem}
                name="codigo_armazem"
                error={!!touched.codigo_armazem && !!errors.codigo_armazem}
                helperText={touched.codigo_armazem && errors.codigo_armazem}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Adicionar Funcionario
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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  codigo_armazem: yup.string().required("required"),
  contact1: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  codigo_armazem: "",
  contact1: "",
};

export default FuncionarioForm;
