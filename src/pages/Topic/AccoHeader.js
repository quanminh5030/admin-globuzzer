import React from 'react'
import AccomodationTest from '../Admin/AdminTopic/AccomodationPage/AccomodationTest';
import BannerTopicForm from '../Admin/BannerForm/BannerTopicForm';
import Banner from './Banner/Banner';

const AccoHeader = ({ contentEditable }) => {

  return (
    <div>
      <div style={{ position: 'relative', bottom: "-40px" }}>
        <BannerTopicForm
          collection='topic_items'
          doc='accomodation'
        />
      </div>

      <AccomodationTest contentEditable={contentEditable} />
      <Banner />
    </div>
  )
}

export default AccoHeader
