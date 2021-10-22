import React, { useContext } from 'react'
import HeaderContent from './MainImg/HeaderContent';
import BannerTopicForm from '../../Admin/BannerForm/BannerTopicForm';
import Banner from './Banner/Banner';
import { useParams } from 'react-router-dom';
import { TopicPathContext } from '../../../contexts/editContext';

const Header = ({ contentEditable }) => {
  const { cityId } = useParams();

  const topicName = useContext(TopicPathContext);

  return (
    <div>
      <div style={{ position: 'relative', bottom: "-40px" }}>
        <BannerTopicForm
          collection={topicName.admin}
          doc={cityId}
        />
      </div>

      <HeaderContent contentEditable={contentEditable} />
      <Banner />
    </div>
  )
}

export default Header
