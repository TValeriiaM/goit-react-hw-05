import css from "./ErrorText.module.css"

export default function ErrorText() {
    return (
        <p className={css.errorText}>Error! Please, check the site address or reload the page!</p>
    )
}