import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Portfolio from "../Portfolio/Portfolio";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

const Main = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;