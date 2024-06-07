import { ColorRing } from "react-loader-spinner"
import css from "./Loader.module.css"

export default function Loader() {
    return (<div className={css.loaderContainer}>
        <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <h3>Please wait. The process of uploading movies is in progress</h3>
    </div>)
}