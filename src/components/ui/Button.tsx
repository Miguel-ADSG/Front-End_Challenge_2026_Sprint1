import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
    children: ReactNode;
    variant?: Variant;
    className?: string;
}

// Quando "to" é informado o botão vira um <Link> do React Router.
// Caso contrário, vira um <button> comum (pode receber onClick, type, etc).
type ButtonProps =
    | (ButtonBaseProps & { to: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
    | (ButtonBaseProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-brand-900 text-white hover:bg-brand-700 focus-visible:outline-brand-900",
    secondary:
        "border-2 border-brand-900 text-brand-900 hover:bg-brand-50 focus-visible:outline-brand-900",
    ghost:
        "bg-gold-500 text-brand-950 hover:bg-gold-400 focus-visible:outline-gold-600",
};

const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
    "transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-50";

export default function Button({ children, variant = "primary", className = "", to, ...rest }: ButtonProps) {
    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}