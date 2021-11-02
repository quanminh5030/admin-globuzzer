import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { app, firestore } from '../../../../utils/firebase.utils';
import styles from './Career.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAttractionCardForm from '../../Service/attraction/AddAttractionCardForm';
import moment from 'moment';
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AttractionServiceCard from '../../Service/attraction/AttractionServiceCard';
import { FaSuitcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import CareerServiceCard from '../../Service/career/CareerServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import { upperCaseFirstLetter } from '../../../../utils/upperCaseFirstLetter';

const Career = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  const { editMode, editStyle } = useContext(EditContext);

  //states
  const [showList, setShowList] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const [currentCard, setCurrentCard] = useState({});
  const [careers, setCareers] = useState([]);

  useEffect(() => getData(), [cityId, topicName, showEdit])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setCareers(doc.data().careerData)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

  }

  const handleList = e => {
    setShowList(false)
  }

  const openEditForm = (item) => {
    setShowEdit(true);
    setCurrentCard({
      id: item.id,
      category: item.category,
      companyName: item.companyName,
      image: item.image,
      link: item.link,
      title: item.title,
      city: item.city,
      deadline: item.deadline
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

  const onAddService = () =>
    (showAdd && editMode) ?
      <div>
        <AddAttractionCardForm
        // title='Cultures'
        // uploadLabel='Cover image'
        // uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
        // textLabel='Title'
        // onFileChange={onFileChange}
        // addFeatureCard={addCultureCard}
        // setShow={setShowAdd}
        />
      </div>
      : <div></div>

  const onEditService = () =>
    (showEdit & editMode) &&
    <div>
      <CareerServiceCard
        title='Career'
        currentFeatureCard={currentCard}
        uploadLabel='Cover image'
        uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
        onFileChange={onFileChange}
        updateFeatureCard={updateCard}
        deleteTopicCard={deleteCard}
        setShow={setShowEdit}
      />
    </div>

  const deleteCard = (id) => {
    alert('Are you sure you want to delete the card?');
    setShowEdit(false);

    const updatedCareers = careers.filter(c => c.id !== id);

    return firestore.collection(topicName.admin).doc(cityId).update({
      careerData: updatedCareers
    })
  }

  const updateCard = updatedItem => {
    const updatedCareers = careers.map(c => {
      return c.id === updatedItem.id ? { ...updatedItem, image: fileUrl || updatedItem.image } : c;
    })

    setFileUrl('');

    console.log('Q', updatedCareers)
    console.log('Q2', careers)

    return firestore.collection(topicName.admin).doc(cityId).update({
      careerData: updatedCareers
    })
  }

  return (
    <section className={styles.container}>
      <header
        className={styles.careerHeader}
        style={editMode ? { display: 'flex', justifyContent: 'flex-end' } : {}}
      >
        <div style={editMode ? { marginRight: 430 } : {}}>
          <BlogHeader label='Find suitable jobs' />
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

      <div className={styles.check}>
        <div>
          <input type='date' placeholder='Date' name='date' min={moment(new Date()).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Job types"
              readOnly={true}
              onClick={() => setShowList(!showList)}
              name='category'
              onChange={handleChange}
            />

            <nav style={{ height: showList && "130px" }}>
              <ul>
                {/* {categories.map((category, index) =>
                  <li key={index}>{category.replace('_', ' ')}</li>
                )} */}
              </ul>
            </nav>
          </span>

          <p className={styles.formselect}>
            <IconContext.Provider
              value={{
                className: "dropIcon",
                style: { transform: showList && "rotate(180deg)" },
              }}
            >
              <TiArrowSortedDown color='white' style={{ marginTop: 10 }} />
            </IconContext.Provider>
          </p>
        </div>
      </div>


      <div className={styles.careerFlex} >
        <div className={styles.careerList}>
          {careers && careers.map(job =>
            <Fragment key={job.id}>
              <div
                className={styles.careerItems}
                style={editMode ? editStyle : {}}
                onClick={editMode ? () => openEditForm(job) : undefined}
              >
                <div className={styles.careerUp}>
                  <img src={job.image} alt={job.title} />
                  <div
                    className={styles.category}
                    style={((job.category === 'Sales') || (job.category === 'Business')) ? { backgroundColor: '#49bdbb' } : { backgroundColor: '#EDB34C' }}
                  >
                    {job.category}
                  </div>

                  <div className={styles.deadline}>
                    {moment(job.deadline).format('DD/MM/yyyy')}
                  </div>
                </div>

                <div className={styles.careerDown}>
                  <div>
                    <div className={styles.basicInfo}>
                      <div>
                        <FaSuitcase color='#BDBDBD' />
                        <span>{job.companyName}</span>
                      </div>

                      <div>
                        <FaMapMarkerAlt color='#BDBDBD' />
                        <span>{job.city}</span>
                      </div>
                    </div>

                    <div style={{ marginLeft: 20 }}>
                      <FaUser color='#BDBDBD' />
                      <span>{job.title}</span>
                    </div>

                  </div>

                  <button onClick={() => window.open(job.link, '_blank')}>
                    APPLY NOW
                  </button>
                </div>
              </div>

              {showEdit && currentCard.id == job.id &&
                <div className={styles.editBox}>
                  {onEditService()}
                </div>
              }

            </Fragment>
          )
          }
        </div>

        <div className={styles.vimeo}>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>
      </div>

    </section>
  )
}

export default Career
