import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage (with validation)
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    try {
      const parsedFavs = storedFavs ? JSON.parse(storedFavs) : [];
      if (Array.isArray(parsedFavs)) setFavorites(parsedFavs);
      else setFavorites([]);
    } catch {
      setFavorites([]);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Optionally sync favorites between tabs
  useEffect(() => {
    const syncFavorites = (event) => {
      if (event.key === "favorites") {
        try {
          const parsedFavs = event.newValue ? JSON.parse(event.newValue) : [];
          setFavorites(Array.isArray(parsedFavs) ? parsedFavs : []);
        } catch {
          setFavorites([]);
        }
      }
    };
    window.addEventListener("storage", syncFavorites);
    return () => window.removeEventListener("storage", syncFavorites);
  }, []);

  // Prevent duplicate movies
  const addToFavorites = (movie) => {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};