import React, { useContext } from 'react'
import { TopicPathContext } from '../../../contexts/editContext'
import Attraction from './Attractions/Attraction';
import Culture from './Culture/Culture';
import Hotels from './Hotel/Hotels';
import Transportation from './Transport/Transportation';

const LandingTopic = () => {
  const topicName = useContext(TopicPathContext);

  console.log('landing', topicName)

  switch (topicName.name) {
    case 'accomodation':
      return <Hotels />

    case 'attraction':
      return <Attraction />

    case 'culture':
      return <Culture />

    case 'transportation': 
      return <Transportation />

    default:
      return;

  }

  // return (
  //   <div>

  //   </div>
  // )
}

export default LandingTopic
