import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css"

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Page does not exist</h3>
      <p className={css.text}>
        Go back to{" "}
        <Link className={css.link} to="/">
          Home page
        </Link>
      </p>
    </div>
  );
}