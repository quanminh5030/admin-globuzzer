import React, { useContext, useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader'
import { EditContext, TopicPathContext } from '../../../../contexts/editContext'
import { app, firestore } from '../../../../utils/firebase.utils'
import styles from './Attraction.module.css'
import { FaHeart, FaShare } from 'react-icons/fa'
import Vimeo from '../../../Section/Vimeo/Vimeo'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AttractionServiceCard from '../../Service/attraction/AttractionServiceCard'
import { sizeTransform } from '../../../../utils/sizeTransform'
import AddAttractionCardForm from '../../Service/attraction/AddAttractionCardForm'
import { v4 as uuidv4 } from 'uuid';
import { upperCaseFirstLetter } from '../../../../utils/upperCaseFirstLetter'

const Attraction = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  const { editMode, editStyle } = useContext(EditContext);

  //states
  const [attractions, setAttractions] = useState([])
  const [currentAttr, setCurrentAttr] = useState('sea');
  const [currentCard, setCurrentCard] = useState({});

  const [showEditAttr, setShowEditAttr] = useState(false);
  const [showAddAttr, setShowAddAttr] = useState(false);
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => getData(), [cityId, topicName, showEditAttr, showAddAttr])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setAttractions(doc.data().attractionData);
    }
  }

  const openEditForm = item => {
    setShowEditAttr(true);
    setCurrentCard({
      id: item.id,
      content: item.content,
      img: item.img,
      link: item.link,
      title: item.title
    })
  }

  const onEditService = () =>
    (showEditAttr & editMode) &&
    <div>
      <AttractionServiceCard
        title='Attraction'
        currentFeatureCard={currentCard}
        uploadLabel='Cover image'
        uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
        textLabel='Title'
        onFileChange={onFileChange}
        updateFeatureCard={updateCard}
        deleteTopicCard={deleteCard}
        setShow={setShowEditAttr}
      />
    </div>

  const deleteCard = (id) => {
    alert('Are you sure you want to delete the card?')
    setShowEditAttr(false);

    const updatedContent = attractions[currentAttr].data.filter(attr => attr.id !== id);

    const newTitle = upperCaseFirstLetter(currentAttr);

    attractions[currentAttr] = {
      title: newTitle,
      data: updatedContent
    }

    return firestore.collection(topicName.admin).doc(cityId).update({
      attractionData: attractions
    })
  }

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

  const updateCard = updatedItem => {
    const attrObj = attractions;

    const updatedContent = attrObj[currentAttr].data.map(item =>
      item.id === updatedItem.id ?
        { ...updatedItem, img: fileUrl || updatedItem.img }
        : item
    )

    const updatedData = Object.values(attrObj).map(item =>
      item.title.toLowerCase() === currentAttr ?
        { title: upperCaseFirstLetter(currentAttr), data: updatedContent }
        : item
    )

    const updatedObject = {};

    Object.keys(attrObj).map(key => {
      updatedData.map(data =>
        data.title.toLowerCase() === key ?
          updatedObject[key] = data : undefined
      )
    })

    return firestore.collection(topicName.admin).doc(cityId).update({
      attractionData: updatedObject
    })
  }

  //add card
  const onAddService = () => {
    return (
      (showAddAttr && editMode) ?
        <div>
          <AddAttractionCardForm
            title='Attractions'
            uploadLabel='Cover image'
            uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
            textLabel='Title'
            onFileChange={onFileChange}
            addFeatureCard={addAttractionCard}
            setShow={setShowAddAttr}
          />
        </div>
        : <div></div>
    )
  }

  const addAttractionCard = newCard => {
    setShowAddAttr(false);

    const newAttractionList = attractions[currentAttr].data;
    newAttractionList.push({ ...newCard, id: uuidv4(), img: fileUrl || '' });

    attractions[currentAttr] = {
      title: upperCaseFirstLetter(currentAttr),
      data: newAttractionList
    }

    return firestore.collection(topicName.admin).doc(cityId).update({
      attractionData: attractions
    })
  }


  return (
    <section className={styles.container}>
      <header
        className={styles.attractionHeader}
        style={editMode ? { display: 'flex', justifyContent: 'flex-end' } : {}}
      >
        <div style={editMode ? { marginRight: 370 } : {}}>
          <BlogHeader label='Find suitable attractions' />
        </div>

        {editMode &&
          <div
            onClick={() => setShowAddAttr(true)}
          >
            <AddCircleIcon
              fontSize='large'
              className={styles.addCirle}
              style={{ color: !showAddAttr ? '#C4C4C4' : '#F24B6A' }}
            />
            {showAddAttr &&
              <div>
                {onAddService()}
              </div>
            }
          </div>
        }
      </header>

      <div className={styles.attractionBtn}>
        {attractions && Object.keys(attractions).map(attr =>
          <button
            key={attr}
            onMouseOver={() => setCurrentAttr(attr)}
            style={attr === currentAttr ? { backgroundColor: '#F24B6A', color: 'white' } : {}}
          >
            {attractions[attr].title}
          </button>
        )}
      </div>

      <div className={styles.attractionFlex} >
        <div className={styles.attractionList}>

          {attractions[currentAttr] && attractions[currentAttr].data.map(attr =>
            <Fragment key={attr.id}>
              <div
                className={styles.attractionItems}
                style={editMode ? editStyle : {}}
                onClick={editMode ? () => openEditForm(attr) : undefined}
              >
                <div className={styles.attractionLeft}>
                  <img src={attr.img} alt={currentAttr} />
                </div>

                <div className={styles.attractionRight}>
                  <div>
                    <header>{attr.title}</header>

                    <div style={{ display: 'flex' }}>
                      <FaShare className={styles.icon} onClick={() => console.log('share')} />
                      <FaHeart className={styles.icon} onClick={() => console.log('heart')} />
                    </div>
                  </div>

                  <p>{attr.content}</p>

                  <button onClick={() => window.open(attr.link ? attr.link : '#')}>
                    Explore more
                  </button>
                </div>
              </div>

              {showEditAttr && currentCard.id == attr.id &&
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

export default Attraction
