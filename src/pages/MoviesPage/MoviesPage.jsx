import { getSearchMovies } from "../../moviesSearchingAPI"
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SearchMoviesForm from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorText from "../../components/ErrorText/ErrorText";

export default function MoviesPage() {
    const [searchMovies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [searchManyParams, setManyParams] = useSearchParams();
    const searchQuery = searchManyParams.get("query")??'';

    useEffect(() => {
        if (!searchQuery) {
      return
    }
        async function fetchMovies() {
            try {
                setLoading(true);
                setError(false);
                const { results } = await getSearchMovies(searchQuery);
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
    }, [searchQuery])
    
    const handleSubmit = async (topic) => {
        searchManyParams.set("query", topic);
        setManyParams(searchManyParams);
    };
    
    return (
        <div>
            <SearchMoviesForm onSearch={handleSubmit} />
            {loading && <Loader />}
            {isError && <ErrorText />}
            {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
        </div>
    )
}

