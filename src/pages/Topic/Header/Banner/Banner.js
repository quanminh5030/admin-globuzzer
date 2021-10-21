import React, { useContext, useEffect, useState } from 'react'
import playButton from '../../../../assets/Topic/Menu/playButton.png';
import banner from './banner.module.css';
import { IconContext } from 'react-icons/lib';
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  IoIosArrowForward,
} from "react-icons/io";
import YouTube from 'react-youtube';
import { app, firestore } from '../../../../utils/firebase.utils';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { sizeTransform } from '../../../../utils/sizeTransform';
import TopicServiceCardForm from '../../Service/TopicServiceCardForm';
import { useParams } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChurch, faDollarSign, faFlag, faRecycle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart, faRecycle, faChurch, faFlag, faDollarSign)

const Banner = () => {
  const { cityId, city } = useParams();
  const topicName = useContext(TopicPathContext);

  const [current, setCurrent] = useState(topicName.firstBanner);
  const [video, setVideo] = useState({
    playVideo: false,
    videoId: ''
  })
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [currentFeatureCard, setCurrentFeatureCard] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentServiceCard, setCurrentServiceCard] = useState([])

  //image
  const [fileUrl, setFileUrl] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);

  const opts = {
    width: "100%",
    height: "380px",
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    getData();
  }, [loading])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      setLoading(true);
    } else {
      const init = doc.data().banner.filter(b => b.id === 1)
      setData(init)
      setList(doc.data())
    }
  }

  const changeList = currentList => {
    const init = list.banner.filter(d => d.title.toLocaleLowerCase() === currentList)
    setData(init)

    setCurrent(currentList)
    setVideo({ playVideo: false })
  }

  const listStyle = desc => {
    if (desc.toLocaleLowerCase() === current) {
      return {
        background: '#FF889E',
      }
    }
  }

  const playVideo = ({ videoId }) => {
    const newVideo = { ...video };
    newVideo.playVideo = true;
    newVideo.videoId = videoId;

    setVideo(newVideo);
  }

  const onReady = e => {
    e.target.playVideo();
  }

  const closeVideo = () => {
    const newVideo = { ...video };
    newVideo.playVideo = false;
    newVideo.videoId = '';

    setVideo(newVideo);
  }

  const closeList = () => {
    setData([]);
    setCurrent('');
  }

  const openVideosEditForm = item => {
    setShowEditForm(true);
    setCurrentFeatureCard({
      id: item.id,
      title: item.title,
      link: item.link,
      icon: item.icon,
      videoId: item.videoId,
      content: item.content,
      img: item.img
    })
  }

  const openServiceEditForm = item => {
    setShowServiceForm(true);
    setCurrentServiceCard({
      id: item.id,
      title: item.title,
      link: item.link,
      icon: item.icon,
      videoId: item.videoId,
      content: item.content,
      img: item.img
    })
  }

  const updateServiceCard = (updatedFeatureCard) => {
    setLoading(!loading);
    setShowServiceForm(false);
    const updatedCard = list.banner.map(b => {
      return b.id === updatedFeatureCard.id ? { ...updatedFeatureCard, img: fileUrl || updatedFeatureCard.img, icon: iconUrl || updatedFeatureCard.icon } : b;
    })

    setFileUrl(null);
    setIconUrl(null);

    return firestore.collection(topicName.admin).doc(cityId).update({
      banner: updatedCard
    })
  }

  const onFileChangeIcon = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/accomodation/${file.name}`);
      await fileRef.put(file);
      setIconUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  //for the video cards
  const onSelectedCard = (item, currentCard) => {
    return (
      (item.id === currentCard.id &&
        showEditForm && editMode) ?
        <div>
          <TopicServiceCardForm
            title='Videos'
            uploadLabel='Cover image'
            textLabel='Title'
            uploadDescription='(The image has to be below 200 KB and PNG/JPG format)'
            show={showEditForm}
            setShow={setShowEditForm}
            currentFeatureCard={currentFeatureCard}
            updateFeatureCard={updateFeatureCard}
            onFileChange={onFileChange}
          />
        </div>
        : <div></div>
    )
  }

  //for the service cards
  const onSelectedService = (item, currentCard) => {
    return (
      (showServiceForm && editMode) ?
        <div>
          <TopicServiceCardForm
            title='Service'
            uploadLabel='Icon'
            textLabel='Text'
            uploadDescription='The size of the image should be maximum 500kb, and the format need to be PNG, JPG'
            show={showServiceForm}
            setShow={setShowServiceForm}
            setLoading={setLoading}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateServiceCard}
            onFileChange={onFileChangeIcon}
          />
        </div>
        : <div></div>
    )
  }

  //for the image handling
  const typeValidation = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }

  //manage the update image file
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/accomodation/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  //manage update
  const updateFeatureCard = (updatedFeatureCard) => {
    setLoading(!loading);
    const updatedVideos = list.banner.map(b => {
      const newVideoId = updatedFeatureCard.link.split('=')[1];

      return b.id == updatedFeatureCard.id ? { ...updatedFeatureCard, img: fileUrl || updatedFeatureCard.img, videoId: newVideoId || '' } : b;
    })

    setFileUrl(null);
    setIconUrl(null);

    return firestore.collection(topicName.admin).doc(cityId).update({
      banner: updatedVideos
    })
  }

  return (
    <section>
      <div className={banner.list}>
        {list.banner && list.banner.map(item =>
          <div
            key={item.id}
            onMouseOver={() => {
              changeList(item.title.toLocaleLowerCase());
            }}
            onClick={editMode ? () => openServiceEditForm(item) : undefined}
            className={banner.listflex}
            style={{ ...editStyle, ...listStyle(item.title.toLocaleLowerCase()) }}
          >
            <span style={{ height: 60, display: 'flex', alignItems: 'center' }}>
              <img src={item.icon} alt={item.title} />
            </span>
            <span>{item.title}</span>

            {item.title.toLocaleLowerCase() == current ?
              <div>
                {onSelectedService(item, currentFeatureCard)}
              </div>
              : <></>
            }
          </div>
        )}
      </div>

      {video.playVideo && (
        <div className={`${banner.video} ${banner.bannervideo}`}>
          <span onClick={closeVideo} className={banner.closeIcon}>
            <IconContext.Provider value={{ className: "icon" }}>
              <AiOutlineCloseCircle />
            </IconContext.Provider>
          </span>
          <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      )}

      {!video.playVideo && data &&
        (data.map((d) => (
          <div
            className={banner.listitem} key={d.id}
            onClick={editMode ? () => openVideosEditForm(d) : undefined}
            style={{ ...editStyle }}
          >
            <div className={banner.listleft}>
              <img style={{ width: '100%', height: '100%' }} src={d.img} alt={city} id="list" />
              <div className={banner.listdesc}>
                <div className={banner.listVid} onClick={() => playVideo(d)}>
                  <img src={playButton} alt="playButton" id="listVid" style={{ height: 53 }} />
                </div>
                <p>Accomodation in {city}</p>
              </div>
            </div>

            <div className={banner.listright}>
              <header>
                <span>{d.title}</span>{" "}
                <span onClick={closeList}>
                  <IconContext.Provider value={{ className: "icon" }}>
                    <AiOutlineCloseCircle />
                  </IconContext.Provider>
                </span>
              </header>

              <div className={banner.listpara}>
                <p>{d.content}</p>
              </div>

              <div className={banner.listmore}>
                <p>
                  View more details{" "}
                  <IconContext.Provider
                    value={{ className: "icon arrow-right" }}
                  >
                    <IoIosArrowForward fontSize={25} />
                  </IconContext.Provider>
                </p>
              </div>
            </div>

            <div>
              {onSelectedCard(d, currentFeatureCard)}
            </div>

          </div>
        ))
        )}
    </section>
  )
}

export default Banner
