import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Autocomplete from '@mui/material/Autocomplete';
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";

const Vendas = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

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

        {
            field: "qnt",
            headerName: "Quantidade",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Preç. Unit",
            flex: 1,
        },
        {
            field: "ttl",
            headerName: "Total",
            flex: 1,
        },
    ];

    return (
        <><Box m="20px">
            <Header title="PAGINA DE VENDAS" subtitle="Venda alguns produtos" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values, errors, touched, handleBlur, handleChange, handleSubmit,
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
                                disablePortal
                                options={""}
                                sx={{ gridColumn: "span 2" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="prodt"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                renderInput={(params) => <TextField {...params} label="Produto" />}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Quantidade"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }} />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
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
                        rows={mockDataContacts}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>

                <table style={{width:'100%'}}>
                    <tr style={{ textAlign: 'right' }}>
                        <th>IVA 17%</th>
                        <th>SUB TOTAL</th>
                    </tr>
                    <tr style={{ textAlign: 'right' }}>
                        <td>140 MZN</td>
                        <td>1556 MZN</td>
                    </tr>
                </table>

                <Box display="flex" justifyContent="end" mt="30px" >
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
});
const initialValues = {
    prod: "",
    qnt: "",
};

export default Vendas;
