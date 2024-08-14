import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Articles from "./pages/Articles/Articles";
import BuscaInscricao from "./pages/BuscaInscricao/BuscaInscricao";
import Chamadas from "./pages/Chamadas/Chamadas";
import Comite from "./pages/Comite/Comite";
import ConfirmedActivities from "./pages/ConfirmedActivities/ConfirmedActivities";
import Contact from "./pages/Contact/Contact";
import Error404 from "./pages/Error404/Error404";
import Hackthon from "./pages/Hackthon/Hackthon";
import Home from "./pages/Home/Home";
import Ideathon from "./pages/Ideathon/Ideathon";
import AllPagamentoProduto from "./pages/Pagamento/AllPagamentosProdutos";
import Pagamento from "./pages/Pagamento/Pagamento";
import Partners from "./pages/Partners/Partners";
import Edition2023 from "./pages/PreviousEditions/2023";
import Privacy from "./pages/Privacy/Privacy";
import ProgrammingMarathon from "./pages/ProgrammingMarathon/ProgrammingMarathon";
import TechnologyFair from "./pages/TechnologyFair/TechnologyFair";
import Timeline from "./pages/Timeline/Timeline";
import Inscricoes from "./pages/Inscricoes/Inscricoes";
import Market from "./pages/Market/Market"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/parceiros" element={<Partners />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/articles" element={<Articles />} />
          <Route exact path="/hackathon" element={<Hackthon />} />
          <Route exact path="/timeline" element={<Timeline />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/inscricao" element={ <Inscricoes /> } />
          <Route exact path="/busca/inscricao/:tipo_busca?" element={<BuscaInscricao />} />
          <Route exact path="/pagamento/user/:user_id/lote/:lote_id" element={<Pagamento />} />
          <Route exact path="/chamadas" element={<Chamadas />} />
          <Route exact path="/comite" element={<Comite />} />
          <Route exact path="/ideathon" element={<Ideathon />} />
          <Route exact path="/technology-fair" element={<TechnologyFair />} />
          <Route exact path="/confirmed-activities" element={<ConfirmedActivities />} />
          <Route exact path="/programming-marathon" element={<ProgrammingMarathon />} />
          <Route exact path="/2023" element={<Edition2023 />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/market/user/:user_id/pagamentos" element={<AllPagamentoProduto />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
