import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"
import clsx from "clsx";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    return (
        <header className={css.header}>
        <nav className={css.navigationContainer}>
            <ul className={css.list}>
                <li>
            <NavLink to="/" className={linkClass}>
                Home
            </NavLink>
                </li>
                <li>
            <NavLink to="/movies" className={linkClass}>
                Movies
            </NavLink>
                </li>
            </ul>
            </nav>
        </header>
    )
}