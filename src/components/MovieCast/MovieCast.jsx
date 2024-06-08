import { useEffect, useState } from "react";
import { getMovieCredits } from "../../moviesSearchingAPI";
import { useParams } from "react-router-dom";
import ErrorText from "../ErrorText/ErrorText";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css"

export default function MovieCast() {
    const [movieCast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const { movieId } = useParams();
    const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

    useEffect(() => {
        if (!movieId) return;
        async function fetchMovieCast() {
            try {
                setLoading(true);
                const data = await getMovieCredits(movieId);
                setCast(data);
            }
            catch {
                setError(true);
            }
            finally {
                setLoading(false)
            }
        }
        fetchMovieCast()
    }, [movieId]);

    return (
    <div>
        {loading && <Loader/>}
        {isError && <ErrorText />}
        
        {movieCast &&
            (<ul className={css.castsList}>
            {movieCast.map(({ id, profile_path, name, character }) => (
                <li key={id} className={css.castItem}>
                    <img src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg} alt={name} />
                    <h4 className={css.castName}>{name}</h4>
                    <p className={css.castCharacter}>Character:{character}</p>
                </li>
            ))}
            </ul>)
        } 
    </div>
    )
}

