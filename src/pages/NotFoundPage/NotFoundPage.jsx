import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css"

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2>Page does not exist</h2>
      <h3>
        Go back to{" "}
        <Link to="/">
          Home page
        </Link>
      </h3>
    </div>
  );
}