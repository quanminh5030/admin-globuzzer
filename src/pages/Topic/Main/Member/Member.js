import React, { useContext, useEffect, useState, Fragment } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { EditContext } from "../../../../contexts/editContext";
import { app, firestore } from "../../../../utils/firebase.utils";
import { sizeTransform } from "../../../../utils/sizeTransform";
import { MemberCard } from "../../../Section/Members/MemberCard";
import styles from "./members.module.css";

import CommunityMembersForm from '../../../Admin/JoinCommunityForm/SectionMembersForm';

function Members() {
  const { cityId } = useParams();

  const { editStyle, editMode } = useContext(EditContext);
  const [fileUrl, setFileUrl] = useState(null);

  const [members, setMembers] = useState([]);
  const [showMembersForm, setShowMembersForm] = useState(false);
  const [currentMember, setCurrentMember] = useState({ id: "", name: '', flags: '', image: '' });

  useEffect(() => {
    getData()
  }, [cityId, showMembersForm]);

  const getData = async () => {
    const doc = await firestore.collection('accomodation_items').doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setMembers(doc.data().member)
    }
  }

  const getCurrentMember = (ref) => {
    const member = members.filter((m) => {
      return m.id === ref.current.id;
    });
    setCurrentMember(member[0]);
    setShowMembersForm(true);
  };

  // validations for uploaded images
  const typeValidation = ["image/png", "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }
  // manage the upload member picture form + type and size validation
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

  const updateMemberData = (({ currentMember }, updatedMember) => {
    setShowMembersForm(false);
    const updatedMembers = members.map((s) => s.id === updatedMember.id ? { ...updatedMember, image: fileUrl || updatedMember.image } : s)
    setShowMembersForm(false);
    firestore.collection('accomodation_items').doc(cityId).update({
      member: updatedMembers
    });

  });

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        Top members to meet<div className={styles.underline}></div>
      </header>

      <div className={styles.grid} style={editStyle}>
        <div className={styles.empty}>
          {members.slice(0, 2).map(member =>
            <MemberCard
              key={member.id}
              memberData={member}
              getCurrentMember={getCurrentMember}
            />
          )}

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


          {members.slice(2, 5).map((memberData) => (
            <MemberCard
              key={memberData.id}
              memberData={memberData}
              getCurrentMember={getCurrentMember} />
          ))}
        </div>
      </div>

      {editMode &&
        <Fragment>
          {showMembersForm &&
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

    </section>
  );
}

export default Members;
