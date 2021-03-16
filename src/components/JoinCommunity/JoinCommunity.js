import React, { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MemberNearYou } from "../MemberNearYou/MemberNearYou";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import "./style.css";
import Gunjan from "../../assets/Gunjan.png";
import Chloe from "../../assets/Chloe.png";
import Jonathan from "../../assets/Jonathan.png";
import Chloé from "../../assets/Asya.png";
import JoinCommunityForm from "../../pages/Admin/JoinCommunityForm/JoinCommunityForm";
import { EditContext } from "../../contexts/editContext";
import TextEdit from "../TextEdit/TextEdit";
import { app, firestore } from "../../utils/firebase.utils";
import { Fragment } from "react";
import CommunityMembersForm from "../../pages/Admin/JoinCommunityForm/CommunityMembersForm";
import { sizeTransform } from "../../utils/sizeTransform";

export const JoinCommunity = (props) => {
  const { editStyle, contentEditable } = props;
  const { width } = GetWindowDimension();
  const { editMode } = useContext(EditContext);
  const [showTextCommunityForm, setShowTextCommunityForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showMembersForm, setShowMembersForm] = useState(false);
  const [MemberNearYouData, setMemberNearYouData] = useState([]);
  const [currentMember, setCurrentMember] = useState({id: "", name: '', city: '', img: ''});
  const [fileUrl, setFileUrl] = useState(null);
  
  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };

  const [fetchedCommunityTexts, setFetchedCommunityTexts] = useState([]);
  const [currentCommunityText, setCurrentCommunityText] = useState(rawText);

  const formTextStyle = editMode && showTextCommunityForm ? {
    position: 'relative',
    top: '1%' ,
    left: '10%',
  }
            : 

  { display: 'none',};

  // fetch community 'texts' content from db
  useEffect(() => {
    const getTexts = firestore
      .collection("community")
      .onSnapshot((snapshot) => {
        const newText = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedCommunityTexts(newText);
      });
      return () => getTexts();
  }, []);

  // fetch 'videos' content from db
  useEffect(() => {
    const fetchVideos = firestore
    .collection('video')
    .onSnapshot((snapshot) => {
      const newVideo = snapshot.docs.map((doc) => ({
        ...doc.data()
      }));
      setVideos(newVideo);
    });
    return () => fetchVideos();
  }, []);

  // fetch comunnity 'member_near' content from db
  useEffect(() => {
    const getMembers = firestore
      .collection("member_near")
      .onSnapshot((snapshot) => {
        const newMember = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMemberNearYouData(newMember);
      });
      return () => getMembers();
  }, []);

  const showForm = () => {
    return editMode ? setShowPhotoForm(true) : undefined;
  };

  const getCurrentCommunityText = (e) => {
    const newText = fetchedCommunityTexts.filter((text) => {
      return text.id === e.target.id;
    });
    setCurrentCommunityText(newText[0]);
    setShowTextCommunityForm(true);
  };

  // change handler for community text
  const handleChangeCommunityText = (e) => {
    setCurrentCommunityText(prev => ({...prev, content: e.target.innerText, id: e.target.id}));
 };

  const handleSubmitText = async (text) => {
    if (text.id) {
      await firestore.collection("community").doc(text.id).update(text);
      // setShowTextCommunityForm(false);
    console.log(text.id, "saved to db");
    }
  };

  const onSelectedText = (text, currentText) => {
    return (
      showTextCommunityForm && text.id === currentText.id &&
      <TextEdit 
        save={handleSubmitText(currentCommunityText)}
        currentText={currentText} 
        formTextStyle={formTextStyle} 
        setShowForm={setShowTextCommunityForm} 
      />
    );
  };
  const getCurrentMember = (e) => {
    const member = MemberNearYouData.filter((m) => {
      return m.id === e.target.id;
    });
    setCurrentMember(member[0]);
    setShowMembersForm(true);
  };

  const updateMemberData = (({currentMember}, updatedMember) => {
    setShowMembersForm(false);
    firestore.collection('member_near').doc(currentMember.id).update(updatedMember)
  });

  // on form submit, the file url is set in firestore
  const onFileSubmit = async (data) => {
    const getCollection = firestore.collection('member_near');
    await getCollection.doc(currentMember.id).set({
      img: fileUrl || data.img,
      city: data.city,
      name: data.name
    })
    console.log("file saved:", fileUrl)
    setShowMembersForm(false);
  }

  // validations for uploaded images
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload member picture form + type and size validation
  const onFileChange = async (e) => {
  const file = e.target.files[0];
  const storageRef = app.storage().ref();
  if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
    const fileRef = storageRef.child(`members/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }
}

  const Join = () => (
    <section className="join">
      <div className="join_video_container" onClick={showForm}>
      {videos.map(video => (
        <video
          key={video.img}
          width="100%"
          autoPlay
          playsInline
          loop
          muted
          poster={video.img}
          className="video"
          style={editStyle}
        >
          <track kind="captions" />
        </video>
        ))}
      </div>
      <div className="join_info">
        {fetchedCommunityTexts.map(t => (
          <Fragment key={t.id}>
            {onSelectedText(t, currentCommunityText)}
            <p
            className={t.cssid}
            id={t.id}
            name={t.id}
            contentEditable={contentEditable}
            style={{ ...editStyle, ...t.style }}
            suppressContentEditableWarning
            onFocus={getCurrentCommunityText}
            onBlur={handleChangeCommunityText}
            // onClick={() => setShowTextCommunityForm(true)}
          >
            {t.content}
          </p>
        </Fragment>
        ))}
        <div 
          className="join_member_list" 
          style={
            {...editStyle, 
              padding:" 8px 0 8px 0", 
              justifyContent:'space-evenly'
            }
          }
        >
          {MemberNearYouData.map((memberData, index) => (
            <MemberNearYou memberData={memberData} key={index} getCurrentMember={getCurrentMember} />
          ))}
        </div>
        <button type="button" className="join_button">
          <Link to="/signup" className="join_button_anchor">
            Join us
          </Link>
        </button>
        
      </div>
      { editMode && 
      <Fragment>
        { showMembersForm && 
          <CommunityMembersForm
          currentMember={currentMember}
          setShowMembersForm={setShowMembersForm}
          updateMemberData={updateMemberData}
          onFileSubmit={onFileSubmit}
          onFileChange={onFileChange}
        />
        }
        <JoinCommunityForm 
          showPhotoForm={showPhotoForm} 
          setShowPhotoForm={setShowPhotoForm} 
      />
      </Fragment>
      }
    </section>
  );

  const JoinMobile = () => (
    <div>
      <SectionHeader header="Top members to meet" />
      <div className="member_meet_grid">
        <div />
        <div className="member_ava_container">
          <img src={Gunjan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Gunjan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Chloe} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloe</p>
          <p className="member_ava_city">Lives in Amsterdam</p>
        </div>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FiPlus className="member_join_icon" />
            </div>
            <button type="button" className="flip-card-back">
              <Link to="/signup" className="join_button_anchor">
                Join us
              </Link>
            </button>
          </div>
        </div>
        <div className="member_ava_container">
          <img src={Chloé} alt="ava" className="member_ava" />
          <p className="member_ava_name">Chloé</p>
          <p className="member_ava_city">Lives in Paris</p>
        </div>
        <div />
        <div className="member_ava_container">
          <img src={Jonathan} alt="ava" className="member_ava" />
          <p className="member_ava_name">Jonathan</p>
          <p className="member_ava_city">Lives in Stockholm</p>
        </div>
        <div />
      </div>
    </div>
  );
  return <>{width > 1100 ? <Join /> : <JoinMobile />}</>;
};
