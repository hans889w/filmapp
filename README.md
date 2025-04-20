FilmApp

A movie browsing app built with React, TypeScript, Tailwind CSS, and Ant Design. Users can explore popular movies, filter by genre, and search for movies using the OMDb API. Hover over a movie card to see detailed information in a popover.

Features





Browse popular movies fetched from OMDb API.



Search movies by title.



Filter movies by genre.



Hover over movie cards to see details (poster, IMDB rating, year, story, genre, cast).



Responsive design with Tailwind CSS.


Tech Stack


Axios: API requests to OMDb.



Vite: Build tool and development server.

Prerequisites




Node.js (v16 or higher)



npm or yarn

![alt text](image.png)

An OMDb API key (get one from OMDb API)

Installation





Clone the repository:

git clone https://github.com/kullanici-adi/filmapp.git
cd filmapp



Install dependencies:

npm install



Create a .env file in the root directory and add your OMDb API key:

VITE_OMDB_API_KEY=your-api-key

Note: The current code has a hardcoded API key (fc1fef96). For security, replace it with your own key in Home.tsx and use the .env variable.



Update Home.tsx to use the environment variable:

const response = await axios.get('http://www.omdbapi.com/', {
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
    s: term,
    type: 'movie',
  },
});

(Repeat for the handleSearch function.)



Run the development server:

npm run dev



Open http://localhost:5173 in your browser.

