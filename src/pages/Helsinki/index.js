import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SearchCity } from "../../components/SearchCity/SearchCity";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import services from "../../Data/HelsinkiServicesData";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import HelsinkiTopicData from "../../Data/HelsinkiTopicData";
import "./style.css";

const Helsinki = () => {
  const sorted = services.slice(0, 5);
  const { width } = GetWindowDimension();
  return (
    <>
      <section className="helsinki_header">
        <div className="helsinki_header_url">
          <p>Landing Page</p>
          <AiFillCaretRight className="helsinki_header_url_icon" />
          <p>Helsinki</p>
        </div>
        <p id="header_1">Helsinki Community</p>
        <p id="helsinki_header_2">Explore different topics and information</p>
        <SearchCity />
        <p id="header_suggestion">
          Maybe <a href="./AboutUs.js">Stockholm</a>,{" "}
          <Link to="./helsinki">Helsinki</Link> or
          <a href="Paris">Paris</a>?
        </p>
      </section>
      <section className="helsinki_services">
        <SectionHeader header="Recommended services to you" />
        <div className="helsinki_services_container">
          {width >= 1100 ? (
            <>
              {sorted.map((service, index) => (
                <div className="single_service_container">
                  <img
                    alt="service"
                    key={index}
                    src={service.icon}
                    className="single_service_icon"
                  />
                  <p className="single_service_name">{service.name}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              {services.map((service, index) => (
                <div className="single_service_container">
                  <img
                    alt="service"
                    key={index}
                    src={service.icon}
                    className="single_service_icon"
                  />
                  <p className="single_service_name">{service.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
      <section className="helsinki_topics">
        <SectionHeader header="Top Topics to explore" />
        {HelsinkiTopicData.map((topic, index) => (
          <div key={index}>
            <img src={topic.img} alt="topic" />
          </div>
        ))}
      </section>
    </>
  );
};

export default Helsinki;
