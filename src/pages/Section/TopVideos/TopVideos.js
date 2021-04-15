import React, { useContext, useEffect, useState } from 'react';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import KeenSlider from '../../../components/Carousel/Carousel';
import { EditContext } from '../../../contexts/editContext';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';
import VideoForm from './VideoForm';

const TopVideos = ({ cityId, render }) => {
  const { editStyle, editMode} = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [videosNow, setVideosNow] = useState([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({});
  const [fileUrl, setFileUrl] = useState(null);
  const [deleteForm, showDeleteForm] = useState(false);


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
    // console.log('martor')
    getCurrentCity();
  }, [cityId, showVideoForm, deleteForm, render]);

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
        {!loading ? (
          <KeenSlider
            data={videos}
            editStyle={editStyle}
            getCurrentVideo={getCurrentVideo}
            cityId={cityId}
            showDeleteForm={showDeleteForm}
            setShowVideoForm={setShowVideoForm}
          />
        ) : <div>loading...</div>}
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