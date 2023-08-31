import React from "react";
import home from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/main">
        <button>Main</button>
      </Link>
      <Link to="/design1">
        <button>DESIGN 1</button>
      </Link>
      <Link to="/design2">
        <button>DESIGN 2</button>
      </Link>
      <Link to="/design3">
        <button>DESIGN 3</button>
      </Link>
    </>
  );
};

export default Home;
