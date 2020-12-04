import React, { useEffect, useState, useContext } from "react";
import Center from "../../../components/TravelBlog/center/Center";
import Flex from "../../../components/TravelBlog/flex/Flex";
import Menu from "../Menu/Menu";
import ReactPlayer from 'react-player';
import { getStarted } from "../multi_step/showGetStarted";
import header from "./Header.module.css";
import video from "../../../assets/TravelBlog/vid.mp4";

//initial variable for multi-step modals // connected to GetStartedModal file
export const steps = [
  {
    description: `About your \n desired topic`,
    completed: false,
    selected: true,
    highlighted: true,
  },
  {
    description: "About you",
    completed: false,
    selected: false,
    highlighted: false,
  },
  {
    description: `About your \n blog plan`,
    completed: false,
    selected: false,
    highlighted: false,
  },
];

function BlogBanner() {
  //for toggling the modal

  const [smallScreen, setSmallScreen] = useState(false);
  const myContext = useContext(getStarted);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const checkScreen = () => {
    window.innerWidth <= 500 ? setSmallScreen(true) : setSmallScreen(false);
  };

  return (
    <div className={header.container}>
      <Menu />
      <Center>
        <Flex>
          <div className={header.left}>
            {!smallScreen ? (
              <header>Start your travel blog with globuzzer</header>
            ) : (
              <header>
                <p>start your travel</p>
                <p>website</p>
                <p>with globuzzer</p>
              </header>
            )}

            <p className={header.body}>
              Everything you need to begin sharing your travel experiences,
              reach a broader audience and gain profit
            </p>

            {!smallScreen && (
              <div className={header.items}>
                <div>
                  <button onClick={() => myContext.setGetStarted(true)}>
                    Get started
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={header.right}>
            <ReactPlayer url={video} playing={true} loop={true} width='100%' height='100%'/>
          </div>

          {smallScreen && (
            <div className={header.btnSmall}>
              <button onClick={() => myContext.setGetStarted(true)}>
                Get statarted
              </button>
            </div>
          )}
        </Flex>
      </Center>
    </div>
  );
}

export default BlogBanner;
