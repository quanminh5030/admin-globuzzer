import React from 'react'
import Article from './Article/Article';
import bodies from "./body.module.css";
import LandingTopic from './LandingTopic';
import Members from './Member/Member';
import OtherTopics from './Other/OtherTopics';

const Body = () => {
  return (
    <div className={bodies.container}>
      <Article />
      <Members />

      <LandingTopic />

      <OtherTopics />
    </div>
  )
}

export default Body
