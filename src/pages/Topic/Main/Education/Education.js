import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { app, firestore } from '../../../../utils/firebase.utils';
import styles from './Education.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { upperCaseFirstLetter } from '../../../../utils/upperCaseFirstLetter';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AttractionServiceCard from '../../Service/attraction/AttractionServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import AddAttractionCardForm from '../../Service/attraction/AddAttractionCardForm';
import { v4 as uuidv4 } from 'uuid';
import AddTopicCardForm from '../../Service/AddTopicCardForm';

const Education = () => {

  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  const { editMode, editStyle } = useContext(EditContext);
  const [fileUrl, setFileUrl] = useState('');

  //states
  const [schools, setSchools] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [current, setCurrent] = useState('university');
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => getData(), [showEdit, cityId, topicName]);

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no data');
    } else {
      setSchools(doc.data().educationData)
    }
  }

  const openEditForm = item => {
    setShowEdit(true);
    setCurrentCard({
      id: item.id,
      content: item.content,
      img: item.img,
      link: item.link,
      title: item.title,
    })
  }

  const onAddService = () => {
    return (showAdd && editMode) ?
      <div>
        <AddTopicCardForm
          title='Education'
          uploadLabel='Cover image'
          uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
          textLabel='Title'
          onFileChange={onFileChange}
          addFeatureCard={addCard}
          setShow={setShowAdd}
        />
      </div>
      : <div></div>
  }

  const onEditService = () =>
    (showEdit & editMode) &&
    <div>
      <AttractionServiceCard
        title='Education'
        currentFeatureCard={currentCard}
        uploadLabel='Cover image'
        uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
        textLabel='Title'
        onFileChange={onFileChange}
        updateFeatureCard={updateCard}
        deleteTopicCard={deleteCard}
        setShow={setShowEdit}
      />
    </div>

  //image handling stuff
  const typeValidation = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL())
    } else {
      alert(message(file))
    }
  }

  const deleteCard = (id) => {
    alert('Are you sure you want to delete the card?')
    setShowEdit(false);

    const updatedContent = schools[current].filter(s => s.id !== id);
    schools[current] = updatedContent;

    return firestore.collection(topicName.admin).doc(cityId).update({
      educationData: schools
    })
  }

  const updateCard = updatedItem => {
    const schoolObj = schools;

    const updatedContent = schools[current].map(item =>
      item.id === updatedItem.id ?
        { ...updatedItem, img: fileUrl || updatedItem.img }
        : item
    )
    schoolObj[current] = updatedContent;

    return firestore.collection(topicName.admin).doc(cityId).update({
      educationData: schoolObj
    })
  }

  //add school
  const addCard = newCard => {
    setShowAdd(false);
    const schoolObj = schools;

    const newSchoolList = schoolObj[current];
    newSchoolList.push({ ...newCard, id: uuidv4(), img: fileUrl || '' });

    schoolObj[current] = newSchoolList;

    return firestore.collection(topicName.admin).doc(cityId).update({
      educationData: schoolObj
    })
  }

  return (
    <section className={styles.container}>
      <header
        className={styles.schoolHeader}
        style={editMode ? { display: 'flex', justifyContent: 'flex-end' } : {}}
      >
        <div style={editMode ? { marginRight: 370 } : {}}>
          <BlogHeader label='Find suitable universities' />
        </div>

        {editMode &&
          <div
            onClick={() => setShowAdd(true)}
          >
            <AddCircleIcon
              fontSize='large'
              style={{ color: !showAdd ? '#C4C4C4' : '#F24B6A' }}
            />
            {showAdd &&
              <div>
                {onAddService()}
              </div>
            }
          </div>
        }
      </header>

      <div className={styles.schoolBtn}>
        {schools && Object.keys(schools).map(school =>
          <button
            key={school}
            onMouseOver={!editMode ? () => setCurrent(school) : undefined}
            style={school === current ? { backgroundColor: '#F24B6A', color: 'white' } : {}}
          >
            {upperCaseFirstLetter(school.replace('_', ' '))}
          </button>
        )}
      </div>

      {/* school data */}
      <div className={styles.schoolFlex}>
        <div className={styles.schoolList}>
          {schools[current] && schools[current].map(school =>
            <Fragment key={school.id}>
              <div
                className={styles.schoolItems}
                style={editMode ? editStyle : {}}
                onClick={editMode ? () => openEditForm(school) : () => window.open(school.link, '_blank')}
              >
                <div className={styles.schoolImg}>
                  <img src={school.img} alt={current} />
                </div>

                <div className={styles.schoolInfo}>
                  <div>
                    <header>{school.title}</header>
                  </div>
                  <p>{school.content}</p>
                </div>
              </div>

              {showEdit && currentCard.id == school.id &&
                <div className={styles.editBox}>
                  {onEditService()}
                </div>
              }
            </Fragment>
          )}
        </div>

        <div>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>
      </div>
    </section>
  )
}

export default Education
