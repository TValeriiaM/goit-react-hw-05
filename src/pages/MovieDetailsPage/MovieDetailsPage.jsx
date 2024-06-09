import { getMovieDetails } from "../../moviesSearchingAPI";
import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loader from "../../components/Loader/Loader";
import ErrorText from "../../components/ErrorText/ErrorText";
import css from "./MovieDetailsPage.module.css"

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const {movieId} = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const defaultImg = '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>'
  
  useEffect(() => {
    if (!movieId) return;
      async function fetchMoviesDetails() {
       try{
        setError(false);
        setLoading(true);
           const data = await getMovieDetails(movieId);
        setMovieDetails(data);
       }
       catch {
        setError(true)
          }
       finally {
        setLoading(false)
       }
      }
    fetchMoviesDetails()
  }, [movieId])
    
  
    return (
        <div>
        {isError && <ErrorText/>}
        <button className={css.button}><IoIosArrowRoundBack /><NavLink to={backLinkRef.current}> Go back</NavLink></button>
        {loading && <Loader />}
        {movieDetails && (
                <div>
                <section className={css.movieDescribe}>
                <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={"poster"}
              width={250}
            />
            
                <ul className={css.listAboutMovie}>
              <li className={css.item}>
                <h2>
                  {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
                </h2>
              </li>
              <li className={css.item}>
                <p>
                  User score: {Math.round(movieDetails.vote_average * 10)}%
                </p>
              </li>
              <li className={css.item}>
                <h3 className={css.title}>Overview</h3>
                <p>{movieDetails.overview}</p>
              </li>
              <li className={css.item}>
                <h3 className={css.title}>Genres</h3>
                <p>
                  {movieDetails.genres.map(genre => genre.name).join(', ')}
                </p>
              </li>
            </ul>            
            </section>
          {loading && <Loader />} 
            <section>
            <h4 className={css.detailsTitle}>Additional information</h4>
            <ul className={css.listDetails}>
                <li className={css.listItem}>
                    <NavLink to="cast" className={css.link}>
                    Cast
                    </NavLink>
                </li>
                <li className={css.listItem}>
                    <NavLink to="reviews" className={css.link}>
                    Reviews
                    </NavLink>
                </li>
                </ul>
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </section>
                </div>
            )}
            </div>
) 
}





