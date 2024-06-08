import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../moviesSearchingAPI";
import ErrorText from "../ErrorText/ErrorText";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css"

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        async function fetchMovieReviews() {
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
            }
            catch {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovieReviews()
    }, [movieId]);

    return (
        <div>
            {loading && <Loader/>}
            {isError && <ErrorText />}
            {reviews.length > 0 ? (
                <ul className={css.reviewsList}>
                {reviews.map(({ author, content, id }) => (
                    <li className={css.reviewItem} key={id}>
                        <h4 className={css.reviewTitle}>Autor: {author}</h4>
                        <p className={css.reviewsText}>{content}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p>We don`t have any reviews for this movie.</p>
                )}
        </div>
    )
}
