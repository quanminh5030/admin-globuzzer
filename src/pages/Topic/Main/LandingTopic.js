import React, { useContext } from 'react'
import { TopicPathContext } from '../../../contexts/editContext'
import Attraction from './Attractions/Attraction';
import Career from './Career/Career';
import CultureAPI from './Culture/CultureAPI';
import Documentation from './Documentation/Documentation';
import Education from './Education/Education';
import Food from './Food/Food';
import Health from './Health/Health';
import Hotels from './Hotel/Hotels';
import Transportation from './Transport/Transportation';

const LandingTopic = () => {
  const topicName = useContext(TopicPathContext);

  switch (topicName.name) {
    case 'accomodation':
      return <Hotels />

    case 'attraction':
      return <Attraction />

    case 'culture':
      return <CultureAPI />

    case 'transportation':
      return <Transportation />

    case 'education':
      return <Education />

    case 'career':
      return <Career />

    case 'food':
      return <Food />

    case 'health':
      return <Health />

    case 'documentation':
      return <Documentation />

    default:
      return;

  }
}

export default LandingTopic
