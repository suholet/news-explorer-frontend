import "../pages/index.css";
import BaseComponent from "./components/BaseComponent";
import Header from "./components/Header";
import Search from "./components/Search";

function setHeaderProps() {
  const props = JSON.parse(localStorage.getItem("props"));
  return props;
}

(function () {
  new BaseComponent();
  new Header(true, setHeaderProps());
  new Search();
})();
