import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/newsnow.png";
import Footer from "./Footer";

const scrollToFooter = (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  const footer = document.getElementById("Footer"); // Get the footer element
  footer.scrollIntoView({ behavior: "smooth" }); // Scroll to the footer with smooth behavior
};

function Header() {
  const [isIndiaNews, setIsIndiaNews] = useState(false);

  const toggleNews = () => {
    setIsIndiaNews(!isIndiaNews);
    // Here you can trigger your API calls or state updates to switch between India and USA news
    // For now, let's just log the current news source
    console.log(isIndiaNews ? "Switched to USA news" : "Switched to India news");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#F5CC75" }}>
        <div className="container-fluid">
          <nav className="navbar ">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand text-black p-0 m-0">
                <img width="100" height="80" src={logo} alt="logo" />
              </Link>
            </div>
          </nav>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-black m-0">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tech" className="nav-link text-black">
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sports" className="nav-link text-black">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/entertainment" className="nav-link text-black">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/politics" className="nav-link text-black">
                  Politics
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/business" className="nav-link text-black">
                  Business
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-black"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#footer" onClick={(e) => scrollToFooter(e)}>
                      Subscribe to Newsletters
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Get in Touch
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blogs
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
