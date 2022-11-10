import * as React from 'react';
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import TextareaAutosize from '@mui/base/TextareaAutosize';


const ProdutoForm = () => {
    const categoria = [
        { label: 'Verduras', id: 1 },
        { label: 'Frutas', id: 2 },
        { label: 'Legumes', id: 3 },
    ];
    const prodExist = [
        { label: 'Tomate', id: 1 },
        { label: 'Banana', id: 2 },
        { label: 'Arroz', id: 3 },
    ];

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
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
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <Autocomplete
                                fullWidth
                                variant="filled"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.cat}
                                name="cat"
                                error={!!touched.cat && !!errors.cat}
                                helperText={touched.cat && errors.cat}
                                sx={{ gridColumn: "span 2" }}
                                disablePortal
                                id="combo-box-demo"
                                options={categoria}
                                renderInput={(params) =>
                                    <TextField {...params} label="Categoria" />}
                            />
                            <TextareaAutosize
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
                            />
                            
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
    firstName: yup.string().required("required"),
    contact1: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
});
const initialValues = {
    firstName: "",
    email: "",
    contact1: "",
};

export default ProdutoForm;
