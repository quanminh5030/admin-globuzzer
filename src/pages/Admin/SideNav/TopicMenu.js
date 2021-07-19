import React, { useState } from 'react'
import { createMuiTheme, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import useFetch from '../../../hooks/useFetch';
import HelsinkiTopicData from '../../../Data/HelsinkiTopicData';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        backgroundColor: '#716D6D',
        color: 'white',
      },
    },
  }
})


const TopicMenu = ({ anchorElCountries, setAnchorElCountries, setIconDisplay, anchorElTopics, setAnchorElTopics }) => {
  const topics = HelsinkiTopicData;
  const cities = useFetch('cities');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);

  // const showTopics = event => {
  //   setAnchorElTopics(event.currentTarget)
  // }

  // const handleCloseCountry = () => {
  //   setAnchorElCountries(null);
  //   setIconDisplay(false)
  // }

  const handleCloseTopic = () => {
    setAnchorElTopics(null)
  }

  return (
    <ThemeProvider theme={theme}>
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
            to={`/topic/${topic.title.toLowerCase()}/`}
            style={{ color: 'white' }}
            key={index}
          >
            <MenuItem
              selected={selectedTopicIndex === index}
              style={(selectedTopicIndex === index) ? { backgroundColor: '#4BC4BE' } : { backgroundColor: '#716D6D' }}
              onClick={() => {
                setSelectedTopic(topic.title)
                setSelectedTopicIndex(index)
              }}
            >{topic.title}</MenuItem>
          </Link>
        )}
      </Menu>
    </ThemeProvider>
  )
}

export default TopicMenu
