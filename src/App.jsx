import { useEffect, useState } from 'react'
import './App.css'
import SearchBox from './components/SearchBox';
// import Search from './components/Search'
import MovieCard from './components/MovieCard';
import {useDebounce} from'react-use'
import { getTrandingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }

}

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState('')

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [trandingMovies, setTrandingMovies] = useState([]);

  // Debounced the search term to prevent too many API request

  useDebounce(()=> setDebouncedSearchTerm(searchTerm),500 , [searchTerm])


  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');

      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;

      }

      setMovieList(data.results || []) 
      
      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0])
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error} `)
      setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally {
      setIsLoading(false)
    }
  }

  const loadTrandingMovies = async() =>{
    try {
      const movies = await getTrandingMovies();

      setTrandingMovies(movies)
    } catch (error) {
      cconsole.error(`Error fetching trending movies: ${error} `)
    }
  } 

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrandingMovies();
  },[]);

  return (
    <main>
      <div className="pattern " />
      <img  src="logo.png" alt="" />
      <div className="wrapper">
        
        <header>
          
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'> Movies </span>You'll Enjoy Without the Hassle</h1>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trandingMovies.length>0 && (
          <section className='trending'>
            <h2>Tranding Movies</h2>

            <ul>
              {trandingMovies.map((movie,index) =>(
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading?(
            <p className='text-white'>Loading...</p>
          ):errorMessage?(
            <p className="text-red-500">{errorMessage}</p>
          ):(
            <ul>
              {movieList.map((movie) => (
               <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>
  )
}

export default App
