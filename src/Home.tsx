import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';
import MovieCard from './MovieCard';
import Header from './Header';
import Footer from './Footer';

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: string[];
  cast: { name: string; character: string }[];
  release_year: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cachedMovies = localStorage.getItem('movies');
        if (cachedMovies) {
          const parsedMovies: Movie[] = JSON.parse(cachedMovies);
          setMovies(parsedMovies);
          setFilteredMovies(parsedMovies);
          const allGenres: string[] = Array.from(
            new Set(parsedMovies.flatMap((movie: Movie) => movie.genres))
          ).sort();
          setGenres(allGenres);
          setLoading(false);
          return;
        }

        const searchTerms = ['avengers', 'star wars', 'batman'];
        const allMovies: Movie[] = [];

        for (const term of searchTerms) {
          const searchResponse = await axios.get('http://www.omdbapi.com/', {
            params: {
              apikey: 'fc1fef96',
              s: term,
              type: 'movie',
            },
          });

          console.log(`OMDb Search Response for ${term}:`, searchResponse.data);

          if (searchResponse.data.Response === 'False') {
            console.warn(`No results for ${term}:`, searchResponse.data.Error);
            continue;
          }

          const detailPromises = searchResponse.data.Search?.slice(0, 5).map((movie: any) =>
            axios.get('http://www.omdbapi.com/', {
              params: {
                apikey: 'fc1fef96',
                i: movie.imdbID,
              },
            })
          ) || [];

          const detailResponses = await Promise.all(detailPromises);

          const movies = detailResponses.map((response: any) => ({
            id: response.data.imdbID || 'unknown',
            title: response.data.Title || 'unknown',
            overview: response.data.Plot || 'Plot is not currently.',
            poster_path: response.data.Poster !== 'N/A' ? response.data.Poster : 'https://via.placeholder.com/500x750',
            vote_average: parseFloat(response.data.imdbRating) || 0,
            genres: response.data.Genre?.split(', ') || [],
            cast: response.data.Actors?.split(', ').map((actor: string) => ({
              name: actor,
              character: 'unknown',
            })) || [],
            release_year: response.data.Year || 'unknown',
          }));

          allMovies.push(...movies);
        }

        const uniqueMovies = Array.from(
          new Map(allMovies.map((movie) => [movie.id, movie])).values()
        ).slice(0, 20);

        console.log('Mapped Movies:', uniqueMovies);
        setMovies(uniqueMovies);
        setFilteredMovies(uniqueMovies);
        localStorage.setItem('movies', JSON.stringify(uniqueMovies));

        const allGenres: string[] = Array.from(
          new Set(uniqueMovies.flatMap((movie) => movie.genres))
        ).sort();
        setGenres(allGenres);

        setError(null);
      } catch (error: any) {
        console.error('OMDb Error:', error.response || error.message || error);
        setError('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: 'fc1fef96',
          s: searchQuery,
          type: 'movie',
        },
      });

      console.log('Search Response:', response.data);

      if (response.data.Response === 'False') {
        setError('Arama sonucu bulunamadı.');
        setFilteredMovies([]);
        setLoading(false);
        return;
      }

      const detailPromises = response.data.Search?.slice(0, 10).map((movie: any) =>
        axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: 'fc1fef96',
            i: movie.imdbID,
          },
        })
      ) || [];

      const detailResponses = await Promise.all(detailPromises);

      const searchMovies = detailResponses.map((response: any) => ({
        id: response.data.imdbID || 'unknown',
        title: response.data.Title || 'Bilinmiyor',
        overview: response.data.Plot || 'Özet mevcut değil.',
        poster_path: response.data.Poster !== 'N/A' ? response.data.Poster : 'https://via.placeholder.com/500x750',
        vote_average: parseFloat(response.data.imdbRating) || 0,
        genres: response.data.Genre?.split(', ') || [],
        cast: response.data.Actors?.split(', ').map((actor: string) => ({
          name: actor,
          character: 'Bilinmiyor',
        })) || [],
        release_year: response.data.Year || 'Bilinmiyor',
      }));

      setFilteredMovies(searchMovies);
      setError(null);
    } catch (error: any) {
      console.error('Search Error:', error.response || error.message || error);
      setError('ERROR');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreFilter = (genre: string | null) => {
    setSelectedGenre(genre);
    if (genre) {
      setFilteredMovies(movies.filter((movie) => movie.genres.includes(genre)));
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <Header />
      {/* hero bölümü */}
      <section className="py-16 sm:py-24 text-white relative">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/src/assets/video.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-primary/80"></div>
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to Movie World!
          </h2>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto drop-shadow">
            Stream your favorite films anytime, anywhere.
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-accent hover:bg-orange-600 animate-pulse text-lg px-8 py-4 rounded-full shadow-lg hover:ring-4 hover:ring-accent/50 transition-all"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Start to Discover
          </Button>
        </div>
      </section>

      <section className="container mx-auto p-4 sm:p-6 lg:p-8 bg-light">
        <div className="relative mb-8">
          <h3 className="text-3xl font-bold text-center text-dark bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl shadow-lg animate-fade-in">
            Popular Movies
          </h3>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center animate-fade-in">
          <div className="mt-4 sm:mt-0">
            <Select
              placeholder="Choose a Type"
              style={{ width: 200}}
              onChange={handleGenreFilter}
              allowClear
              options={[
                { value: null, label: 'All' },
                ...genres.map((genre) => ({ value: genre, label: genre })),
              ]}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search a Movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={handleSearch}
              className="w-full sm:w-64"
            />
            <Button
              type="primary"
              onClick={handleSearch}
              className="bg-accent hover:bg-orange-600 shadow-lg w-full sm:w-auto hover:scale-105 transition-transform"
            >
              Search
            </Button>
          </div>
        </div>
        {error && <div className="text-red-500 text-center mb-6 animate-fade-in">{error}</div>}
        {loading && <div className="text-center text-dark animate-fade-in">Yükleniyor...</div>}
        {!loading && filteredMovies.length === 0 && !error && (
          <div className="text-center text-dark animate-fade-in">Film bulunamadı.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onGenreClick={handleGenreFilter}
              activeId={activePopoverId}
              setActiveId={setActivePopoverId}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;