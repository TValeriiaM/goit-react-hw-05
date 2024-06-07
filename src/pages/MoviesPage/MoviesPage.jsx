import { getSearchMovies } from "../../moviesSearchingAPI"
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SearchMoviesForm from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorText from "../../components/ErrorText/ErrorText";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isParams, setParams] = useSearchParams();
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!query) {
      return
    }
        async function fetchMovies() {
            try {
                setLoading(true);
                setError(false);
                const { results } = await getSearchMovies(query || isParams.get("query"));
                if (results.length === 0) {
          toast("Sorry! There are no movies for your request");
          return
        }
        setMovies(results)
            }
            catch { 
                setError(true)
            }
            finally {
               setLoading(false) 
        }    
        } 
        fetchMovies();
    }, [query, isParams])
    
    const handleSubmit = async (topic) => {
        setQuery(topic);
        isParams.set({query: topic});
        setParams(isParams);
    };
    
    return (
        <div>
            <SearchMoviesForm onSearch={handleSubmit} />
            {loading && <Loader />}
            {isError && <ErrorText />}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    )
}

