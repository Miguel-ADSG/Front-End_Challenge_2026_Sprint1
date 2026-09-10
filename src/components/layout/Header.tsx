import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/sobre", label: "Sobre" },
    { to: "/integrantes", label: "Integrantes" },
    { to: "/missoes", label: "Missões" },
    { to: "/faq", label: "FAQ" },
    { to: "/contato", label: "Contato" },
];

export default function Header() {
    // useState nº1 do componente: controla a visibilidade do menu mobile.
    const [menuAberto, setMenuAberto] = useState(false);

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? "bg-brand-900 text-white" : "text-brand-900 hover:bg-brand-50"
        }`;

    return (
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                <NavLink to="/" className="text-lg font-extrabold tracking-tight text-brand-900">
                    SoulUp <span className="text-gold-500">| Ecoloop</span>
                </NavLink>

                {/* Navegação desktop */}
                <nav className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.end} className={linkClasses}>
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/transporte"
                        className="ml-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-gold-400"
                    >
                        Converter pontos
                    </NavLink>
                </nav>

                {/* Botão hambúrguer (mobile) */}
                <button
                    type="button"
                    className="rounded-full p-2 text-brand-900 hover:bg-brand-50 md:hidden"
                    aria-haspopup="true"
                    aria-expanded={menuAberto}
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    onClick={() => setMenuAberto((atual) => !atual)}
                >
                    {menuAberto ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Dropdown mobile */}
            {menuAberto && (
                <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-4 py-3 md:hidden">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setMenuAberto(false)}
                            className={linkClasses}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/transporte"
                        onClick={() => setMenuAberto(false)}
                        className="mt-1 rounded-full bg-gold-500 px-4 py-2 text-center text-sm font-semibold text-brand-950 hover:bg-gold-400"
                    >
                        Converter pontos
                    </NavLink>
                </nav>
            )}
        </header>
    );
}