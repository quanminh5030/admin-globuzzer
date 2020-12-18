import React, { useState, useContext } from "react";
import LazyLoad from "react-lazyload";
import "./style.css";
import { Link } from "react-router-dom";
import { EditContext } from "../../contexts/editContext";

const Loading = () => (
  <div>
    <h5>Loading</h5>
  </div>
);

export const JoinCity = (props) => {
  const { editStyle } = useContext(EditContext);
  const { cityData, isViewMore, setMoreJoinCity } = props;
  const { name, img, members, id } = cityData;

  return (
    <LazyLoad placeholder={<Loading />}>
      <div
        className="joincity_container content-editable"
        style={{
          ...editStyle,
          backgroundImage: `url(${img})`,
          backgroundColor: isViewMore ? "#F24B6A" : null,
        }}
        onClick={props.openForm}
        key={id}
      >
        <p
          id="joincity_name"
          style={{
            textAlign: isViewMore && "center",
          }}
        >
          {name}
        </p>
        {isViewMore ? (
          <button
            onClick={() => {
              setMoreJoinCity(true);
            }}
            type="button"
            id="joincity_viewmore"
          >
            View More
          </button>
        ) : (
          <Link to={`/${name}`} type="button" id="joincity_join">
            Explore
          </Link>
        )}

        {!isViewMore && <p id="joincity_members">{members} members</p>}
      </div>
    </LazyLoad>
  );
};
