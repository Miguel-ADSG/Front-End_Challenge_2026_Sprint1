import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Contato from "./pages/Contato";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import MissaoDetalhe from "./pages/MissaoDetalhe";
import Missoes from "./pages/Missoes";
import NotFound from "./pages/NotFound";
import Sobre from "./pages/Sobre";
import Transporte from "./pages/Transporte";

export default function App() {
  return (
    <Routes>
      {/* Layout é a "casca" (Header + Footer) compartilhada por todas as rotas */}
      <Route element={<Layout />}>
        {/* Rotas estáticas */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/transporte" element={<Transporte />} />
        <Route path="/missoes" element={<Missoes />} />

        {/* Rota dinâmica: ":id" é lido via useParams em MissaoDetalhe */}
        <Route path="/missoes/:id" element={<MissaoDetalhe />} />

        {/* Coringa: qualquer caminho não mapeado cai no 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
