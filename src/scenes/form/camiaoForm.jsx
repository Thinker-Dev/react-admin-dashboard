import * as React from 'react';
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const CamiaoForm = () => {
    const refrigeracao = [
        { label: 'Nivel Maximo (-7ºC a 07ºC)', id: 1 },
        { label: 'Nivel Medio  (08ºC a 16ºC)', id: 2 },
        { label: 'Nivel Minimo (17ºC a 26ºC)', id: 3 },
    ];

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="ADICIONAR CAMIAO" subtitle="Adicione um Camiao Novo" />
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
                                label="Matricula do camiao"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.matri}
                                name="matri"
                                error={!!touched.matri && !!errors.matri}
                                helperText={touched.matri && errors.matri}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Capacidade em Toneladas"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.capaci}
                                name="capaci"
                                error={!!touched.capaci && !!errors.capaci}
                                helperText={touched.capaci && errors.capaci}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <Autocomplete
                                fullWidth
                                variant="filled"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.refri}
                                name="refri"
                                error={!!touched.refri && !!errors.refri}
                                helperText={touched.refri && errors.refri}
                                sx={{ gridColumn: "span 2" }}
                                disablePortal
                                id="combo-box-demo"
                                options={refrigeracao}
                                renderInput={(params) =>
                                    <TextField {...params} label="Nivel de Refrigeracao" />}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Adicionar Fornecedor
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
    matri: yup.string().required("required"),
    capaci: yup.string().required("required"),
    refri: yup.string().required("required"),
});
const initialValues = {
    matri: "",
    capaci: "",
    refri: "",
};

export default CamiaoForm;
