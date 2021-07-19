import React from 'react'
import Article from './Article/Article';
import bodies from "./body.module.css";
import Hotels from './Hotel/Hotels';
import Members from './Member/Member';
import OtherTopics from './Other/OtherTopics';

const Body = () => {
  return (
    <div className={bodies.container}>
      <Article />
      <Members />
      <Hotels />
      <OtherTopics />
    </div>
  )
}

export default Body
