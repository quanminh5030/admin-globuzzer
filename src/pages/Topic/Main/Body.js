import React from 'react'
import Article from './Article/Article';
import bodies from "./body.module.css";
import Hotels from './Hotel/Hotels';
import OtherTopics from './Other/OtherTopics';

const Body = () => {
  return (
    <div className={bodies.container}>
      <Article />
      <Hotels />
      <OtherTopics />
    </div>
  )
}

export default Body
