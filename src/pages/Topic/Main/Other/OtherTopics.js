import React, { useContext, useState, useEffect, Fragment } from 'react'
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { app, firestore } from '../../../../utils/firebase.utils';
import others from "./otherTopics.module.css";
import TopicServiceCardForm from '../../Service/TopicServiceCardForm';
import { sizeTransform } from '../../../../utils/sizeTransform';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddTopicCardForm from '../../Service/AddTopicCardForm';
import { useParams } from 'react-router-dom';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { v4 as uuidv4 } from 'uuid';

const OtherTopics = () => {
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({});

  //edit stuff
  const { editMode, editStyle } = useContext(EditContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');

  //add topic
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);

  useEffect(() => {
    getData();
  }, [showEditForm, showAddTopicForm])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setTopics(doc.data().otherTopic)
    }
  }

  const openEditForm = item => {
    setShowEditForm(true);

    setCurrentTopic({
      id: item.id,
      title: item.title,
      description: item.description,
      img: item.img,
      link: item.link
    })
  }

  const onSelectedService = () => {
    return (
      (showEditForm && editMode) ?
        <div>
          <TopicServiceCardForm
            title='Topics'
            currentFeatureCard={currentTopic}
            uploadLabel='Cover image'
            uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
            textLabel='Topic'
            onFileChange={onFileChange}
            updateFeatureCard={updateTopicCard}
            deleteTopicCard={deleteTopic}
            setShow={setShowEditForm}
          />
        </div>
        : <div></div>
    )
  }

  const deleteTopic = (id) => {
    setShowEditForm(false);

    const updatedTopics = topics.filter(topic => topic.id !== id)

    return firestore.collection(topicName.admin).doc(cityId).update({
      otherTopic: updatedTopics
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
      const fileRef = storageRef.child(`topic/accomodation/${file.name}`);
      await fileRef.put(file);

      showEditForm
        ? setFileUrl(await fileRef.getDownloadURL())
        : setNewImgUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  const updateTopicCard = updatedCard => {
    const updatedTopics = topics.map(topic => {
      return topic.id === updatedCard.id ? { ...updatedCard, img: fileUrl || updatedCard.img } : topic;
    })

    return firestore.collection(topicName.admin).doc(cityId).update({
      otherTopic: updatedTopics
    })
  }


  //add topic
  const onAddService = () => {
    return (
      (showAddTopicForm && editMode) ?
        <div>
          <AddTopicCardForm
            title='Topics'
            uploadLabel='Cover image'
            uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
            textLabel='Topic'
            onFileChange={onFileChange}
            addFeatureCard={addTopicCard}
            setShow={setShowAddTopicForm}
          />
        </div>
        : <div></div>
    )
  }

  const addTopicCard = newCard => {
    setShowAddTopicForm(false);

    return firestore.collection(topicName.admin).doc(cityId).update({
      otherTopic: [...topics, { ...newCard, img: newImgUrl, id: uuidv4() }]
    })
  }

  return (
    <section className={others.othertopics}>
      <header
        className={others.topicsheader}
        style={editMode ? { display: 'flex', justifyContent: 'flex-end' } : {}}
      >
        <div style={editMode ? { marginRight: 500 } : {}}>
          <BlogHeader label={window.innerWidth <= 500 ? "Related topics" : "Other topics"} />
        </div>

        {editMode &&
          <div
            onClick={() => setShowAddTopicForm(true)}
          >
            <AddCircleIcon
              fontSize='large'
              className={others.addCirle}
              style={{ color: !showAddTopicForm ? '#C4C4C4' : '#F24B6A' }}
            />
            {showAddTopicForm && 
              <div>
                {onAddService()}
              </div>
            }
          </div>
        }
      </header>

      <div className={others.cardcontainer}>
        {topics.map((topic) => (
          <Fragment key={topic.id}>
            <a href={!editMode ? topic.link : undefined} target='_blank'>
              <div
                className={others.card}
                onClick={editMode ? () => openEditForm(topic) : undefined}
                style={{ ...editStyle }}
              >

                <img src={topic.img} alt={topic.description} />
                <div className={others.carditems}>
                  <p className={others.cardItemsTop}>{topic.title}</p>
                  <p className={others.cardItemsBottom}>{topic.description}</p>
                </div>
              </div>
            </a>


            <div className={others.editBox}>
              {onSelectedService()}
            </div>


          </Fragment>
        ))}


      </div>
    </section>
  )
}

export default OtherTopics
