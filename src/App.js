import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import FuncionarioForm from "./scenes/form/funcionarioForm";
import FornecedorForm from "./scenes/form/fornecedorForm";
import ProdutoForm from "./scenes/form/produtoForm";
import CamiaoForm from "./scenes/form/camiaoForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import ArmazemCategoria from "./scenes/form/armazemCategoria";
import { AccountBox } from "./scenes/form/logSign";
import Vendas from "./scenes/form/vendasForm";
import Camioes from "./scenes/tablesDados/camioes";
import Armazens from "./scenes/tablesDados/armazens";
import Fornecedores from "./scenes/tablesDados/fornecedores";
import { useSelector } from "react-redux";
import { selectUserName } from "./features/user/userSlice";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const userName = useSelector(selectUserName);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {userName ? <Sidebar isSidebar={isSidebar} /> : <></>}

          <main className="content">
            {userName ? <Topbar setIsSidebar={setIsSidebar} /> : <></>}

            <Routes>
              {userName ? (
                <>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="/vendas" element={<Vendas />} />
                  <Route path="/camioes" element={<Camioes />} />
                  <Route path="/armazens" element={<Armazens />} />
                  <Route path="/fornecedores" element={<Fornecedores />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route
                    path="/armazemcategoria"
                    element={<ArmazemCategoria />}
                  />
                  <Route
                    path="/funcionarioform"
                    element={<FuncionarioForm />}
                  />
                  <Route path="/fornecedorForm" element={<FornecedorForm />} />
                  <Route path="/produtoForm" element={<ProdutoForm />} />
                  <Route path="/camiaoForm" element={<CamiaoForm />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </>
              ) : (
                <Route path="/" element={<AccountBox />} />
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
