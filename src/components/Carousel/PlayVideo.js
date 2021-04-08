import React, { useState } from 'react'
import ReactPlayer from 'react-player';

const PlayVideo = ({ video }) => {
  
  const videoSize = () => {
    let opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },};
    (window.innerWidth <= 900) ? ((opts.height = 200) && (opts.width = 300)) : ((opts.height = 390) && (opts.width = 640));
      return opts;
  }
const [opts] = useState(videoSize());

  return (
    <ReactPlayer 
      url={video} 
      height='100%'
      width='100%'
      // muted={true}
      controls={true}
      playing={true}
    />
  );
}

export default PlayVideo;