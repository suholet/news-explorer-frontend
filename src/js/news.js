import "../pages/news.css";

import {isLoggedIn, getUserName} from "./utils/utils";
import BaseComponent from "./components/BaseComponent";
import Header from "./components/Header";
import Statistics from "./components/Statistics";
import SearchResults from "./components/SearchResults";

function setHeaderProps() {
  const props = JSON.parse(localStorage.getItem("props"));
  return props;
}

(function () {
  if (isLoggedIn()) {
    new BaseComponent();
    new Header(false, setHeaderProps());
    new Statistics(getUserName());
    new SearchResults();
  } else {
    location.href ="index.html";
  }
})();
