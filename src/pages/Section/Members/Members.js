import React, { useContext, useState, Fragment, useEffect, useRef } from 'react';
import styles from './Members.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MemberCard } from './MemberCard';
import { EditContext } from '../../../contexts/editContext';
import CommunityMembersForm from '../../Admin/JoinCommunityForm/SectionMembersForm';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';

const Members = ({ cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [showMembersForm, setShowMembersForm] = useState(false);
  const [currentMember, setCurrentMember] = useState({id: "", name: '', flags: '', image: ''});
  const [fileUrl, setFileUrl] = useState(null);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setMembers(doc.data().topMembers)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId, showMembersForm]);

  const getCurrentMember = (ref) => {
    const member = members.filter((m) => {
      return m.id === ref.current.id;
    });
    setCurrentMember(member[0]);
    setShowMembersForm(true);
  };

  const updateMemberData = (({currentMember}, updatedMember) => {
    setShowMembersForm(false);
    const updatedMembers = members.map((s) => s.id === updatedMember.id ? {...updatedMember, image: fileUrl || updatedMember.image} : s)
    setShowMembersForm(false);
  firestore.collection('section_items').doc(cityId).update({topMembers: updatedMembers});
    
  });

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
    const fileRef = storageRef.child(`section/members/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }
  }
  return (
  <div className={styles.wrapper}>
      <BlogHeader label="Top members to meet" />
      <div className={styles.grid} style={editStyle}>
        <div className={styles.empty}/>
        {members.slice(0,2).map((memberData) => (
          <MemberCard 
            key={memberData.id} 
            memberData={memberData} 
            getCurrentMember={getCurrentMember} 
          />
        ))}
        <div className={styles.flipcard}>
          <div className={styles.flipcardInner}>
            <div className={styles.flipcardFront}>
              <FiPlus className={styles.joinIcon} />
            </div>
            <button type="button" className={styles.flipcardBack}>
              <Link to="/signup" className={styles.joinAnchor}>
                Join us
              </Link>
            </button>
          </div>
        </div>
        {members.slice(2,5).map((memberData) => (
          <MemberCard 
            key={memberData.id}
            memberData={memberData} 
            getCurrentMember={getCurrentMember} />
        ))}
        <div />
      </div>
      { editMode && 
    <Fragment>
      { showMembersForm && 
        <CommunityMembersForm
        currentMember={currentMember}
        setShowMembersForm={setShowMembersForm}
        updateMemberData={updateMemberData}
        // onFileSubmit={onFileSubmit}
        onFileChange={onFileChange}
      />
      }
    </Fragment>
    }
  </div>
  );
}

export default Members;
