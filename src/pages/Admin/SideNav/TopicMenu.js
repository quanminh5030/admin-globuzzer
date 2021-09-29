import React, { useState } from 'react'
import { Menu, MenuItem } from '@mui/material';
import TopicData from '../../../Data/TopicData';
import { Link } from 'react-router-dom';


const TopicMenu = ({ anchorElTopics, setAnchorElTopics }) => {
  const topics = TopicData;

  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);

  const handleCloseTopic = () => {
    setAnchorElTopics(null)
  }

  return (
    <Menu
      id='simple-menu'
      anchorEl={anchorElTopics}
      anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      getContentAnchorEl={null}
      open={Boolean(anchorElTopics)}
      onClose={handleCloseTopic}
      
    >
      {topics.length > 0 && topics.map((topic, index) =>
        <Link
          to={{
            pathname: `/topic/${topic.title.toLowerCase()}/`,
            state: { path: selectedTopic }
          }}

          style={{ color: 'white', textDecoration: 'none' }}
          key={index}
        >
          <MenuItem
            selected={selectedTopicIndex === index}
            style={(selectedTopicIndex === index) ? { backgroundColor: '#4BC4BE' } : { backgroundColor: '#716D6D' }}
            onMouseOver={() => {
              setSelectedTopic(topic.path)
              setSelectedTopicIndex(index)
            }}
          >
            {topic.title}
          </MenuItem>
        </Link>
      )}
    </Menu>
  )
}

export default TopicMenu
