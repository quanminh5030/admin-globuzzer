import React, { useState, useEffect, useContect, useContext } from "react";
import styles from "./CityForm.module.css";
import { showEditCity } from "./showEditCity";
const CityForm = () => {
  const showForm = useContext(showEditCity);
  const closeEditCity = () => {
    showForm.setEditCity(false);
  };

  const inputHandler = () => {};
  return (
    <div
      className={styles.container}
      style={{ display: showForm.showEditCity ? "flex" : "none" }}
    >
      <p className={styles.title}>City Section</p>
      <form className={styles.cityForm}>
        <div className={styles.wrapper}>
          <label className={styles.formInput}>
            Cover Image
            <input
              type="text"
              name="image"
              onChange={inputHandler}
              value={image}
            />
          </label>
          <label className={styles.formInput}>
            City Section
            <input
              type="text"
              name="name"
              placeholder="Rome"
              onChange={inputHandler}
              value={name}
            />
          </label>
          <label className={styles.formInput}>
            Link
            <input
              type="text"
              name="join"
              placeholder="http://baidu.com"
              onChange={inputHnadler}
              value={join}
            />
          </label>
          <label className={styles.formInput}>
            Members
            <input
              type="number"
              name="members"
              placeholder="123"
              onChange={inputHandler}
              value={members}
            />
          </label>
        </div>
        <button className={styles.goEdit}>Go to edit this page</button>
      </form>
      <div className={styles.buttonContainer}>
        <button type="submit">Apply</button>
        <button onClick={closeEditCity}>Cancel</button>
      </div>
    </div>
  );
};

export default CityForm;
