import { Formik, Form, Field } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"

export default function SearchMoviesForm({ onSearch }) {
    return (
      <>
        <Toaster  position="top-center"
  reverseOrder={false}/>
        <Formik
      initialValues={{ query: "" }}
          onSubmit={(values, actions) => {
            if (values.query.trim() === "") {
              toast.error("Enter a word to search.")
              return
            }
          onSearch(values.query);
          actions.resetForm();
      }}>
        <Form className={css.form}>     
        <Field className={css.input} type="text" name="query" placeholder="Search movies"/>
        <button type="submit" className={css.button}>Search</button>
      </Form>
    </Formik>
      </>
    )
}
