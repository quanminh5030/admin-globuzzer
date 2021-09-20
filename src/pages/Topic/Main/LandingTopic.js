import React, { useContext } from 'react'
import { TopicPathContext } from '../../../contexts/editContext'
import Attraction from './Attractions/Attraction';
import Career from './Career/Career';
import Culture from './Culture/Culture';
import CultureAPI from './Culture/CultureAPI';
import Education from './Education/Education';
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
      // return <Culture />
      return <CultureAPI />

    case 'transportation':
      return <Transportation />

    case 'education':
      return <Education />

    case 'career':
      return <Career />

    default:
      return;

  }

  // return (
  //   <div>

  //   </div>
  // )
}

export default LandingTopic
