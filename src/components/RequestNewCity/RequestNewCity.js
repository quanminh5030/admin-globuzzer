import React, { useState } from "react";
import "./style.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import requestIcon from "../../assets/Request_new_city_icon.png";
import { GetWindowDimension } from "../../utils/GetWindowDimension";

const Requested = () => (
  <div className="joincity_requested_container">
    <div className="joincity_requested_icon_container">
      <AiOutlineCheckCircle className="joincity_requested_icon" />
      <p id="requested">Request Sent!</p>
    </div>
    <p id="wewould">We would open this city section as soon as possible !</p>
  </div>
);
const RequestDesktop = ({
  query,
  setQuery,
  requestNewCity,
  requestPlaceholder,
  requestTitle,
}) => (
  <div className="joincity_request_city_container">
    <p className="joincity_request_city_title">
      {requestTitle || "Request a new one?"}
    </p>
    <div className="joincity_request_city_icon_container">
      <input
        placeholder={requestPlaceholder || "Request new city here"}
        className="joincity_request_city_input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button
        type="button"
        className="joincity_request_city_button"
        onClick={() => requestNewCity()}
      >
        <img
          src={requestIcon}
          alt="icon"
          className="joincity_request_city_icon"
        />
      </button>
    </div>
  </div>
);
const RequestMobile = ({
  query,
  setQuery,
  requestNewCity,
  requestPlaceholder,
  requestTitle,
}) => (
  <div className="joincity_request_city_container">
    <input
      placeholder={requestPlaceholder || "Request new city here"}
      className="joincity_request_city_input"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />

    <button
      type="button"
      className="joincity_request_city_button"
      onClick={() => requestNewCity()}
    >
      <img
        src={requestIcon}
        alt="icon"
        className="joincity_request_city_icon"
      />
    </button>
  </div>
);
const RequestForm = ({
  query,
  setQuery,
  requestNewCity,
  requestPlaceholder,
  requestTitle,
  width,
}) => (
  <>
    {width > 1100 ? (
      <RequestDesktop
        query={query}
        setQuery={setQuery}
        requestNewCity={requestNewCity}
        requestTitle={requestTitle}
        requestPlaceholder={requestPlaceholder}
      />
    ) : (
      <RequestMobile
        query={query}
        setQuery={setQuery}
        requestNewCity={requestNewCity}
        requestTitle={requestTitle}
        requestPlaceholder={requestPlaceholder}
      />
    )}
  </>
);
export const RequestNewCity = ({ requestTitle, requestPlaceholder }) => {
  const [requested, setRequested] = useState(false);
  const [query, setQuery] = useState("");
  const { width } = GetWindowDimension();
  const requestNewCity = () => {
    query === "" ? alert("Please enter city") : setRequested(true);
  };

  return (
    <>
      {requested ? (
        <Requested />
      ) : (
        <RequestForm
          query={query}
          setQuery={setQuery}
          requestNewCity={requestNewCity}
          requestTitle={requestTitle}
          requestPlaceholder={requestPlaceholder}
          width={width}
        />
      )}
    </>
  );
};
