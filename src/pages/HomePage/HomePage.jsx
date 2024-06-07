import { getTrendingMovies } from "../../moviesSearchingAPI"
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader"
import ErrorText from "../../components/ErrorText/ErrorText"
import { useEffect, useState } from "react";
import css from "./HomePage.module.css"


export default function HomePage() {
   const [trendingMovies, setTrendingMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isError, setError] = useState(false);
   
   useEffect(() => {
       async function fetchMovies() {
        try {
        setLoading(true);
        setError(false);
        const { results } = await getTrendingMovies();
        setTrendingMovies(results);
           }
        catch {
            setError(true);
           }
        finally {
            setLoading(false);
        }   
       }
       fetchMovies()
   }, [])


    return (
        < >
            <h1 className={css.title}>Trending today</h1>
            {loading && <Loader />}
            {isError && <ErrorText />}
            {trendingMovies.length > 0 && <div className={css.container}><MovieList movies={trendingMovies} /></div>}
        </>
    )
}