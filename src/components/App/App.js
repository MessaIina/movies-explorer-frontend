import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MainContext } from "../../contexts/MainContext";
import { useShortAndSearchedMovies } from "../../hooks/useShortAndSearchedMovies";
import {
  registerUser,
  authUser,
  updateUser,
  getUser,
  getSavedMovies,
  saveMovie,
  deleteMovie,
} from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [checkboxIsActive, setCheckboxIsActive] = useState(false);
  const [savedCheckboxIsActive, setSavedCheckboxIsActive] = useState(false);
  const [searchingMovieName, setSearchingMovieName] = useState("");
  const [searchingSavedMovieName, setSearchingSavedMovieName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentUrl = location.pathname;

  const shortAndSearchedMovies = useShortAndSearchedMovies(
    movies,
    checkboxIsActive,
    searchingMovieName
  );
  const shortAndSearchedSavedMovies = useShortAndSearchedMovies(
    savedMovies,
    savedCheckboxIsActive,
    searchingSavedMovieName
  );

  useEffect(() => {
    localStorage.setItem(
      "filteredMovies",
      JSON.stringify(shortAndSearchedMovies)
    );
    setFilteredMovies(shortAndSearchedMovies);
  }, [shortAndSearchedMovies]);
  useEffect(() => {
    setFilteredSavedMovies(shortAndSearchedSavedMovies);
  }, [shortAndSearchedSavedMovies]);

  useEffect(() => {
    setErrorMessage("");
  }, [currentUrl]);
  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, []);
  const handleResetFilteredSavedMovies = moviesState => {
    setFilteredSavedMovies(moviesState);
    setSavedCheckboxIsActive(false);
    setSearchingSavedMovieName("");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Promise.all([getUser(jwt), getSavedMovies()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
          });
          setSavedMovies(savedMoviesData.movies);
          if (localStorage.getItem("movies")) {
            setMovies(JSON.parse(localStorage.getItem("movies")));
          }
          if (localStorage.getItem("filteredMovies")) {
            setFilteredMovies(
              JSON.parse(localStorage.getItem("filteredMovies"))
            );
          }
          if (localStorage.getItem("checkboxIsActive") === "true") {
            setCheckboxIsActive(localStorage.getItem("checkboxIsActive"));
          } else {
            setCheckboxIsActive(false);
          }
          if (localStorage.getItem("searchingMovieName")) {
            setSearchingMovieName(localStorage.getItem("searchingMovieName"));
          }
          setLoggedIn(true);
          navigate(currentUrl, { replace: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleGetMovies = () => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    } else {
      setisLoading(true);
      getMovies()
        .then(movies => {
          setErrorMessage("");
          setMovies(movies);
          localStorage.setItem("movies", JSON.stringify(movies));
        })
        .catch(err => {
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  };

  const handleSaveMovie = movie => {
    saveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      movieId: movie.id,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then(res => {
        const savedFilms = [...savedMovies, res.movie];
        setSavedMovies(savedFilms);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteMovie = movieId => {
    const deletedSavedMovie = savedMovies.find(
      movie => movie.movieId === movieId
    );
    deleteMovie(deletedSavedMovie._id)
      .then(res => {
        setSavedMovies(
          savedMovies.filter(movie => movie._id !== deletedSavedMovie._id)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteSavedMovie = movieId => {
    deleteMovie(movieId)
      .then(res => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== movieId));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCheckboxIsActive = () => {
    localStorage.setItem("checkboxIsActive", !checkboxIsActive);
    setCheckboxIsActive(checkboxIsActive => !checkboxIsActive);
  };
  const handleSavedCheckboxIsActive = state => {
    setSavedCheckboxIsActive(state);
  };

  const handleSearchingMovieName = name => {
    localStorage.setItem("searchingMovieName", name);
    setSearchingMovieName(name.toLowerCase());
  };
  const handleSearchingSavedMovieName = name => {
    setSearchingSavedMovieName(name.toLowerCase());
  };

  const handleLogin = ({ email, password }, resetForm) => {
    authUser({ email, password })
      .then(res => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setErrorMessage("");
          resetForm();
          setInfoTooltipStatus(true);
          setIsInfoToolTipOpen(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
            id: res.id,
          });
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch(err => {
        console.log(err);
        if (err === 401) {
          setErrorMessage("Вы ввели неправильный логин или пароль.");
        } else if (err === 409) {
          setErrorMessage(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        } else {
          setErrorMessage(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        }
      });
  };
  const handleRegister = ({ email, password, name }, resetForm) => {
    registerUser({ email, password, name })
      .then(res => {
        handleLogin({ email, password }, resetForm);
        setInfoTooltipStatus(true);
        setIsInfoToolTipOpen(true);
      })
      .catch(err => {
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка.");
        }
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("filteredSavedMovies");
    localStorage.removeItem("checkboxIsActive");
    localStorage.removeItem("searchingMovieName");
    setCurrentUser({
      name: "",
      email: "",
      id: "",
    });
    setMovies([]);
    setSavedMovies([]);
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setCheckboxIsActive(false);
    setSearchingMovieName("");
    setErrorMessage("");
    setLoggedIn(false);
    navigate("/");
  };

  const handleUpdateUser = ({ name, email }, resetForm) => {
    updateUser({ name, email })
      .then(res => {
        setErrorMessage("");
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email,
        });
        resetForm();
        setInfoTooltipStatus(true);
        setIsInfoToolTipOpen(true);
      })
      .catch(err => {
        setErrorMessage("Пользователь с таким email уже существует.");
      })
  };
  //
  const closeAllPopups = () => {
    setIsInfoToolTipOpen(false);
  };

  return (
    <MainContext.Provider
      value={{
        loggedIn,
        isLoading,
        movies,
        savedMovies,
        filteredMovies,
        filteredSavedMovies,
        checkboxIsActive,
        savedCheckboxIsActive,
        searchingMovieName,
        errorMessage,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="signup"
              element={
                loggedIn ? (
                  <Navigate to={"/movies"} />
                ) : (
                  <Register handleRegister={handleRegister} />
                )
              }
            />
            <Route
              path="signin"
              element={
                loggedIn ? (
                  <Navigate to={"/movies"} />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  handleGetMovies={handleGetMovies}
                  loggedIn={loggedIn}
                  handleCheckboxIsActive={handleCheckboxIsActive}
                  handleSearchingMovieName={handleSearchingMovieName}
                />
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  handleDeleteSavedMovie={handleDeleteSavedMovie}
                  handleSearchingSavedMovieName={handleSearchingSavedMovieName}
                  handleSavedCheckboxIsActive={handleSavedCheckboxIsActive}
                  handleResetFilteredSavedMovies={
                    handleResetFilteredSavedMovies
                  }
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  handleUpdateUser={handleUpdateUser}
                  onSignOut={handleSignOut}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            tooltipStatus={infoTooltipStatus}
          />
        </div>
      </CurrentUserContext.Provider>
    </MainContext.Provider>
  );
};

export default App;