import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { firestore } from '../../../../utils/firebase.utils';
import styles from './Career.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAttractionCardForm from '../../Service/attraction/AddAttractionCardForm';
import moment from 'moment';
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AttractionServiceCard from '../../Service/attraction/AttractionServiceCard';
import { FaSuitcase, FaMapMarkerAlt, FaUser } from 'react-icons/fa'

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

  const [careers, setCareers] = useState([]);
  const [currentCard, setCurrentCard] = useState({});

  const [categories, setCategories] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);

  useEffect(() => getData(), [cityId, topicName, showEdit])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setCareers(doc.data().careerData);
      setCategories(Object.keys(doc.data().careerData))
      setJobInfo(Object.values(doc.data().careerData))
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

  }


  const handleList = e => {
    setShowList(false)
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
      <AttractionServiceCard
      // title='Cultures'
      // currentFeatureCard={currentCard}
      // uploadLabel='Cover image'
      // uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
      // textLabel='Title'
      // onFileChange={onFileChange}
      // updateFeatureCard={updateCard}
      // deleteTopicCard={deleteCard}
      // setShow={setShowEdit}
      />
    </div>
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

            <nav style={{ height: showList && "100px" }}>
              <ul>
                {categories.map((category, index) =>
                  <li key={index}>{category.replace('_', ' ')}</li>
                )}
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

          {jobInfo && jobInfo.map(job =>
            <Fragment key={job.id}>
              <div
                className={styles.careerItems}
                style={editMode ? editStyle : {}}
                onClick={editMode ? () => openEditForm(job) : undefined}
              >
                <div className={styles.careerUp}>
                  <img src={job.image} alt={job.title} />
                  <div>
                    {job.category}
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

                    <div>
                      <FaUser color='#BDBDBD' />
                      <span>{job.title}</span>
                    </div>

                  </div>

                  <button>
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
          )}
        </div>

        <div>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>
      </div>

    </section>
  )
}

export default Career
