import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  const [currentUser, setCurrentUser] = useState({
    name: "Покусака",
    email: "pokusaka@ya.ru",
    id: "738999vf9dcx683e0rf00",
  });

  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };
  const handleRegister = () => {
    setInfoTooltipStatus(true);
    setIsInfoToolTipOpen(true);
    navigate("/signin");
  };
  const handleEditProfile = profileData => {
    setCurrentUser({
      ...currentUser,
      name: profileData.name,
      email: profileData.email,
    });
    setInfoTooltipStatus(true);
    setIsInfoToolTipOpen(true);
  };
  const handleLogOut = () => {
    setLoggedIn(false);
    navigate("/");
  };

  const closeAllPopups = () => {
    setIsInfoToolTipOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route
              path="signup"
              element={<Register handleRegister={handleRegister} />}
            ></Route>
            <Route
              path="signin"
              element={<Login handleLogin={handleLogin} />}
            ></Route>
            <Route path="movies" element={<Movies />}></Route>
            <Route path="movies" element={<Movies />}></Route>
            <Route path="saved-movies" element={<SavedMovies />}></Route>
            <Route
              path="profile"
              element={
                <Profile
                  handleEditProfile={handleEditProfile}
                  onLogOut={handleLogOut}
                />
              }
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            tooltipStatus={infoTooltipStatus}
          />
        </div>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;