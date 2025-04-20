import React from 'react';
import { Popover } from 'antd';
import { StarOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';

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

interface MovieCardProps {
  movie: Movie;
  onGenreClick?: (genre: string) => void;
  activeId?: string | null;
  setActiveId?: (id: string | null) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onGenreClick, activeId, setActiveId }) => {
  const popoverContent = (
    <div className="max-w-sm p-6 bg-gray-800 text-white rounded flex gap-4">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-20 h-30 object-cover rounded"
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
      />
      <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-yellow-500">
          <StarOutlined className=" text-yellow-500" />IMDB: {movie.vote_average}/10
        </p>
        <p className="text-sm text-slate-400">Year: {movie.release_year}</p>
        <p className="text-sm font-bold text-indigo-500">
          <ReadOutlined className="mr-1 text-indigo-500" />Story:
        </p>
        <p className="text-sm mb-2">{movie.overview || 'Özet mevcut değil.'}</p>
        
        <p className="text-sm font-bold mt-2">Genre:</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              onClick={() => onGenreClick?.(genre)}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-600"
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="text-sm font-bold text-teal-500">
          <TeamOutlined className="mr-1 text-teal-500" />Cast:
        </p>
        <ul className="text-sm mb-2">
          {movie.cast.length > 0 ? (
            movie.cast.map((actor, index) => (
              <li key={index}>
                {actor.name} ({actor.character})
              </li>
            ))
          ) : (
            <li>Bilgi Yok</li>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div
      onMouseEnter={() => setActiveId?.(movie.id)}
      onMouseLeave={() => setActiveId?.(null)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <Popover
        content={popoverContent}
        title={movie.title}
        trigger="hover"
        placement="right"
        open={activeId === movie.id}
      >
        <div>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-70 object-cover hover:scale-105 duration-100"
            onError={() => console.log('Image failed:', movie.poster_path)}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">IMDB: {movie.vote_average}</p>
            <p className="text-gray-600">Year: {movie.release_year}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default MovieCard;