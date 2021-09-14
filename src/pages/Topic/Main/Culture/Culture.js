import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import styles from './Culture.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { app, firestore } from '../../../../utils/firebase.utils';
import { upperCaseFirstLetter } from '../../../../utils/upperCaseFirstLetter';
import { FaHeart, FaShare } from 'react-icons/fa'
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AttractionServiceCard from '../../Service/attraction/AttractionServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import AddAttractionCardForm from '../../Service/attraction/AddAttractionCardForm';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import firebase from 'firebase/app'

const Culture = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  const { editMode, editStyle } = useContext(EditContext);

  //states
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [fileUrl, setFileUrl] = useState('')

  const [cultures, setCultures] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [current, setCurrent] = useState('museum');


  useEffect(() => getData(), [cityId, topicName, showEdit])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setCultures(doc.data().cultureData)
    }
  }

  const onAddService = () => {
    return (
      (showAdd && editMode) ?
        <div>
          <AddAttractionCardForm
            title='Cultures'
            uploadLabel='Cover image'
            uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
            textLabel='Title'
            onFileChange={onFileChange}
            addFeatureCard={addCultureCard}
            setShow={setShowAdd}
          />
        </div>
        : <div></div>
    )
  }

  const openEditForm = item => {
    setShowEdit(true);
    setCurrentCard({
      id: item.id,
      content: item.content,
      img: item.img,
      link: item.link,
      title: item.title,
      date: item.date
    })
  }

  const onEditService = () =>
    (showEdit & editMode) &&
    <div>
      <AttractionServiceCard
        title='Cultures'
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

    const updatedContent = cultures[current].filter(cul => cul.id !== id);
    cultures[current] = updatedContent;

    return firestore.collection(topicName.admin).doc(cityId).update({
      cultureData: cultures
    })
  }

  const updateCard = updatedItem => {
    const cultureObj = cultures;

    const dateToTimestamp = firebase.firestore.Timestamp.fromDate(updatedItem.date)

    const updatedContent = cultures[current].map(item =>
      item.id === updatedItem.id ?
        { ...updatedItem, date: dateToTimestamp, img: fileUrl || updatedItem.img }
        : item
    )
    cultureObj[current] = updatedContent;

    return firestore.collection(topicName.admin).doc(cityId).update({
      cultureData: cultureObj
    })
  }

  //add card
  const addCultureCard = newCard => {
    setShowAdd(false);
    const cultureObj = cultures;

    const dateToTimestamp = firebase.firestore.Timestamp.fromDate(newCard.date)

    const newCultureList = cultureObj[current];
    newCultureList.push({ ...newCard, id: uuidv4(), img: fileUrl || '', date: dateToTimestamp });

    cultureObj[current] = newCultureList;

    return firestore.collection(topicName.admin).doc(cityId).update({
      cultureData: cultureObj
    })
  }

  return (
    <section className={styles.container}>
      <header
        className={styles.attractionHeader}
        style={editMode ? { display: 'flex', justifyContent: 'flex-end' } : {}}
      >
        <div style={editMode ? { marginRight: 370 } : {}}>
          <BlogHeader label='Find suitable activities' />
        </div>

        {editMode &&
          <div
            onClick={() => setShowAdd(true)}
          >
            <AddCircleIcon
              fontSize='large'
              className={styles.addCirle}
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

      <div className={styles.attractionBtn}>
        {cultures && Object.keys(cultures).map(culture =>
          <button
            key={culture}
            onMouseOver={() => setCurrent(culture)}
            style={culture === current ? { backgroundColor: '#F24B6A', color: 'white' } : {}}
          >
            {upperCaseFirstLetter(culture)}
          </button>
        )}
      </div>

      <div className={styles.attractionFlex} >
        <div className={styles.attractionList}>

          {cultures[current] && cultures[current].map(culture =>
            <Fragment key={culture.id}>
              <div
                className={styles.attractionItems}
                style={editMode ? editStyle : {}}
                onClick={editMode ? () => openEditForm(culture) : undefined}
              >
                <div className={styles.attractionLeft}>
                  <img src={culture.img} alt={current} />
                  <div>
                    {culture && moment(culture.date.toDate()).format('MMMM Do')}
                  </div>
                </div>

                <div className={styles.attractionRight}>
                  <div style={{ position: 'relative' }}>
                    <header>{culture.title}</header>

                    <div>
                      <FaShare className={styles.icon} onClick={() => console.log('share')} />
                      <FaHeart className={styles.icon} onClick={() => console.log('heart')} />
                    </div>
                  </div>

                  <p>{culture.content}</p>

                  <button onClick={() => window.open(culture.link ? culture.link : '#')}>
                    Explore more
                  </button>
                </div>
              </div>

              {showEdit && currentCard.id == culture.id &&
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

export default Culture
