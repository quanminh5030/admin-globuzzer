import React from 'react'
import HeaderContent from './MainImg/HeaderContent';
import BannerTopicForm from '../../Admin/BannerForm/BannerTopicForm';
import Banner from './Banner/Banner';
import { useParams } from 'react-router-dom';

const Header = ({ contentEditable }) => {
  const { cityId } = useParams();

  return (
    <div>
      <div style={{ position: 'relative', bottom: "-40px" }}>
        <BannerTopicForm
          collection='accomodation_items'
          doc={cityId}
        />
      </div>

      <HeaderContent contentEditable={contentEditable} />
      <Banner />
    </div>
  )
}

export default Header
