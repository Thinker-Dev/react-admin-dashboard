import * as React from 'react';
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Chip from '@mui/material/Chip';


const ArmazemCategoria = () => {
    const categoria = [
        { label: 'Verduras', id: 1 },
        { label: 'Frutas', id: 2 },
        { label: 'Legumes', id: 3 },
    ];

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="ADICIONAR ARMAZEM E CATEGORIAS" subtitle="Crie um Armazem novo" />
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
                                label="Nome do Armazem"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={categoria}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Categorias"
                                        placeholder="Categorias"
                                    />
                                )}
                            />
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Adicionar Armazem
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

export default ArmazemCategoria;
