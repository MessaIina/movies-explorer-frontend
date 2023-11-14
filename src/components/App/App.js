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
  authorizeUser,
  deleteMovie,
  getSavedMovies,
  getUser,
  registerUser,
  saveMovie,
  updateUser,
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
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
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

  // Переменные сортированных фильмов
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

  // Сохраняю фильмы в стор и стейт после каждого поиска
  useEffect(() => {
    localStorage.setItem(
      "filteredMovies",
      JSON.stringify(shortAndSearchedMovies)
    );
    setFilteredMovies(shortAndSearchedMovies);
  }, [shortAndSearchedMovies]);
  // Сохраняю сохранённые фильмы в стейт после каждого поиска
  useEffect(() => {
    setFilteredSavedMovies(shortAndSearchedSavedMovies);
  }, [shortAndSearchedSavedMovies]);

  // Очистка сообщения ошибки при смене роута
  useEffect(() => {
    setErrorMessage("");
  }, [currentUrl]);
  // Сброс сохранённых фильмов при первой отрисовке (необходим из-за работы хука фильтрации)
  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, []);
  const handleResetFilteredSavedMovies = moviesState => {
    setFilteredSavedMovies(moviesState);
    setSavedCheckboxIsActive(false);
    setSearchingSavedMovieName("");
  };

  // Основной эффект при загрузке страницы
  useEffect(() => {
    // Проверка токена и получение информации о пользователе и фильмах
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
          // Запись переменных из стора в стейт
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

  // Получение основного списка фильмов
  const handleGetMovies = () => {
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
  };
  // Сохранение фильма
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
  // Удаление фильма на странице всех фильмов
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
  // Удаление фильма на странице сохранённых фильмов
  const handleDeleteSavedMovie = movieId => {
    deleteMovie(movieId)
      .then(res => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== movieId));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Управление чекбоксом -->
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
  // <-- Поисковой строкой

  // Авторизация
  const handleLogin = ({ email, password }, resetForm) => {
    authorizeUser({ email, password })
      .then(res => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setErrorMessage("");
          resetForm();
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
  // Регистрация
  const handleRegister = ({ email, password, name }, resetForm) => {
    registerUser({ email, password, name })
      .then(res => {
        // Автоматическая авторизация после успешной регистрации
        handleLogin({ email, password }, resetForm);
      })
      .catch(err => {
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка.");
        }
      });
  };
  // Выход из аккаунта (очистка стора и стейтов)
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
    // Редирект на главную
    navigate("/");
  };
  // Обновление данных пользователя
  const handleUpdateUser = ({ name, email }, resetForm) => {
    // setisLoading(true);
    updateUser({ name, email })
      .then(res => {
        setErrorMessage("");
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email,
        });
        resetForm();
        setTooltipStatus(true);
        setIsTooltipPopupOpen(true);
      })
      .catch(err => {
        setErrorMessage("Пользователь с таким email уже существует.");
      })
      .finally(() => {
        // setisLoading(false);
      });
  };
  //
  const closeAllPopups = () => {
    setIsTooltipPopupOpen(false);
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
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            tooltipStatus={tooltipStatus}
          />
        </div>
      </CurrentUserContext.Provider>
    </MainContext.Provider>
  );
};

export default App;