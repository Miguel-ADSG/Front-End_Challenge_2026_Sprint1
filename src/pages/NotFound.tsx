import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <PageHero titulo="404 — Página não encontrada" />
            <section className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
                <p className="text-gray-600">O endereço acessado não existe ou foi movido.</p>
                <Button onClick={() => navigate("/")} className="mt-6">
                    Voltar para a Home
                </Button>
            </section>
        </div>
    );
}