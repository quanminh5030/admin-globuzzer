import React, { useContext, useEffect, useState } from 'react';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import VideoCarousel from '../../../components/VideoCarousel/VideoCarousel';
import { EditContext } from '../../../contexts/editContext';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';
import VideoForm from './VideoForm';

const TopVideos = ({ cityId }) => {
  const { editStyle, editMode} = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({});
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setVideos(doc.data().videos)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId]);

  const getCurrentVideo = (id) => {
    const video = videos.filter((m) => {
      return m.id === id;
    });
    setCurrentVideo(video[0]);
    setShowVideoForm(true);
  };

  const updateVideoData = (({currentVideo}, updatedVideo) => {
    setShowVideoForm(false);
    const updatedVideos = videos.map((s) => s.id === updatedVideo.id ? {...updatedVideo, coverImg: fileUrl || updatedVideo.coverImg} : s)
    setShowVideoForm(false);
  firestore.collection('section_items').doc(cityId).update({videos: updatedVideos});
    
  });

  // validations for uploaded images
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload video picture placeholder form + type and size validation
  const onFileChange = async (e) => {
  const file = e.target.files[0];
  const storageRef = app.storage().ref();
  if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
    const fileRef = storageRef.child(`section/videos/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }
  }

  return (
    <div>
      <BlogHeader label="Top Videos to see"/>
      <div>
        <VideoCarousel videos={videos} editMode={editMode} editStyle={editStyle} getCurrentVideo={getCurrentVideo}/>
      </div>
      { editMode && 
    <>
      { showVideoForm && 
        <VideoForm
        currentMember={currentVideo}
        setShowMembersForm={setShowVideoForm}
        updateMemberData={updateVideoData}
        onFileChange={onFileChange}
      />
      }
    </>
    }
    </div>
  );
};

export default TopVideos;