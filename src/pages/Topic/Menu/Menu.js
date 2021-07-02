import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiMap, BiMessageX, BiDollarCircle } from "react-icons/bi";
import { TiShoppingBag } from "react-icons/ti";
import { VscThreeBars } from "react-icons/vsc";
import { RiArrowDropDownFill } from "react-icons/ri";
import icon_img from "../../../assets/Topic/Menu/Vector.png";
import logo from "../../../assets/Topic/Menu/globuzzer_logo.png";
import menu from "./menu.module.css";


function Menu() {
  const [scroll, setScroll] = useState(false);
  const [displaySidebar, setSidebar] = useState(false);
  const [weather, setWeather] = useState("");
  const [search, setSearch] = useState("");

  const handleScroll = () => {
    if (window.pageYOffset > 30) return setScroll(true);
    setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    document.body.addEventListener("click", () => setSidebar(false));

    currentTemp();
  }, []);

  const currentTemp = () => {
    try {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const lat = coords.latitude,
          long = coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=114ee7a60061eee0bf6dcbadd54d36a8&units=metric`;
        const { data } = await Axios(url);

        const temp = Math.round(data.main.temp) + "°C";
        setWeather(temp);
      });
    } catch (error) {
      setWeather("");
    }
  };

  const navStyle = () => {
    if (scroll) {
      return {
        position: "fixed",
        border: "none",
        background: "rgba(0, 0, 0, 0.7)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        width: "100%",
      };
    }
  };

  const serviceStyle = (link) => {
    const s = search.toLowerCase();

    if (s.length > 2) {
      if (link.startsWith(s) || link.endsWith(s) || link.includes(s)) {
        return {
          color: "#f24b6a",
        };
      }
    }
  };

  return (
    <React.Fragment>
      <nav className={menu.topMenu} style={navStyle()}>
        <header className={menu.mHeader}>
          <img src={logo} alt="logo" />
        </header>

        <ul className={menu.mCenter}>
          <li className={`${menu.mList} ${menu.dest}`}>
            Destinations
            <IconContext.Provider value={{ className: "dropdown" }}>
              <RiArrowDropDownFill />
            </IconContext.Provider>
            <nav className={`${menu.destination} ${menu.d}`}>
              <ul>
                <p className={menu.recently}>Recently:</p>
                <li>Rome</li>
                <li>Stockholm</li>
              </ul>

              <ul>
                <p>All destinations:</p>
              </ul>

              <ul>
                <li>Helsinki</li>
                <li>Rome</li>
                <li>Stockholm</li>
                <li>London</li>
              </ul>

              <ul>
                <li>Oslo</li>
                <li>Amsterdam</li>
                <li>Copenhagen</li>
                <li>San Francisco</li>
              </ul>

              <ul>
                <li>Norway</li>
                <li>Tampere</li>
                <li>Budapest</li>
                <li>Los Angeles</li>
              </ul>

              <ul>
                <li>Jakarta</li>
                <li>Salatiga</li>
                <li>Kiev</li>
                <li>Berlin</li>
              </ul>
            </nav>
          </li>

          <li className={`${menu.mList} ${menu.service}`}>
            Services
            <IconContext.Provider value={{ className: "dropdown" }}>
              <RiArrowDropDownFill />
            </IconContext.Provider>
            <nav className={`${menu.destination} ${menu.s}`}>
              <ul>
                <div>
                  <IconContext.Provider value={{ className: "bs-search" }}>
                    <BsSearch />
                  </IconContext.Provider>
                  <input
                    type="text"
                    placeholder="Search for services here..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className={menu.recently}>Recently:</p>
                <li style={serviceStyle("flight")}>Flight</li>
                <li style={serviceStyle("hotel")}>Hotel</li>
              </ul>

              <ul>
                <p>All services:</p>
              </ul>

              <ul>
                <li style={serviceStyle("event")}>Event</li>
                <li style={serviceStyle("restaurant")}>Restaurant</li>
              </ul>

              <ul>
                <li style={serviceStyle("transportation")}>Transportation</li>
                <li style={serviceStyle("job")}>Job</li>
                <li style={serviceStyle("flight")}>Flight</li>
              </ul>
            </nav>
          </li>

          <li className={`${menu.mList} ${menu.topic}`}>
            Topics
            <IconContext.Provider value={{ className: "dropdown" }}>
              <RiArrowDropDownFill />
            </IconContext.Provider>
            <nav className={`${menu.destination} ${menu.t}`}>
              <ul>
                <p className={menu.recently}>Recently:</p>
                <li>Rome</li>
                <li>Stockholm</li>
              </ul>

              <ul>
                <p>All topics:</p>
              </ul>

              <ul>
                <li>Decisive facts</li>
                <li>Documentation</li>
                <li>Accomodation</li>
                <li>Transportation</li>
              </ul>

              <ul>
                <li>Career guide</li>
                <li>To-do list</li>
                <li>Health</li>
                <li>Internet</li>
              </ul>

              <ul>
                <li>Banking</li>
                <li>Education</li>
                <li>Shopping</li>
                <li>Food</li>
              </ul>

              <ul>
                <li>Culture</li>
                <li>Events</li>
                <li>Attactions</li>
                <li>Entertainment</li>
              </ul>

              <ul>
                <li>Social life</li>
                <li>Sports</li>
                <li>Tourism</li>
              </ul>
            </nav>
          </li>

          <li className={menu.mList}>Pricing</li>
          <li className={`${menu.mList} ${menu.menuOwn}`}>
            Own your own city section
          </li>
        </ul>

        <ul className={menu.mRight}>
          <li>
            <img src={icon_img} alt="weather-icon" />
            {weather}
          </li>
          <li>Log in</li>
          <li>
            <Link to="/city" className="linked">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>

      <nav className={menu.topMenuSmall} style={navStyle()}>
        <ul className={menu.menuSmall}>
          <li className={menu.logo}>
            <img src={logo} alt="logo" />
          </li>

          <li className={menu.bars} onClick={() => setSidebar(true)}>
            <VscThreeBars />
          </li>
        </ul>
      </nav>

      <nav
        className={menu.sidebarSmall}
        style={{ transform: displaySidebar && "translateX(0)" }}
      >
        <ul className={`${menu.sidebarSmallUl} ${menu.sidebarTop}`}>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <BiMap />
              </IconContext.Provider>
            </span>
            <span>Destination</span>
          </li>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <FiSettings />
              </IconContext.Provider>
            </span>
            <span>Services</span>
          </li>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <BiMessageX />
              </IconContext.Provider>
            </span>
            <span>Topics</span>
          </li>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <BiDollarCircle />
              </IconContext.Provider>
            </span>
            <span>Pricing</span>
          </li>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <TiShoppingBag />
              </IconContext.Provider>
            </span>
            <span>Career</span>
          </li>
          <li>
            <span>
              <IconContext.Provider value={{ className: "icon" }}>
                <AiOutlineQuestionCircle />
              </IconContext.Provider>
            </span>
            <span>About us</span>
          </li>
        </ul>

        <div className="line"></div>

        <ul className={`${menu.sidebarSmallUl} ${menu.sidebarBottom}`}>
          <div className={menu.sidebarBtn}>
            <li>
              <button className={menu.ownSection}>
                Own your own city section
              </button>
            </li>
          </div>

          <div className={menu.sidebarAuth}>
            <li>Login</li>

            <Link to="/city" className="linked">
              <li>Signup</li>
            </Link>
          </div>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Menu;
