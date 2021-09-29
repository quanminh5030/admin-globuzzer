import React, { Fragment, useContext, useEffect, useState } from 'react'
import { firestore } from '../../../../utils/firebase.utils';
import '../../../../css/Home.css'
import { IconContext } from "react-icons";
import TextEdit from '../../../../components/TextEdit/TextEdit';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './headerContent.module.css';

const HeaderContent = ({ contentEditable }) => {
  const { editStyle, editMode } = useContext(EditContext);

  const [data, setData] = useState([]);
  const [showTextForm, setShowTextForm] = useState(false)
  //for the title and subtitle
  const [selectHeaders, setSelectHeaders] = useState([]);
  const [fetchedTexts, setFetchedTexts] = useState([]);
  //for the select list
  const [select, setSelect] = useState('');
  const [showList, setShowList] = useState(false);
  const [height, setHeight] = useState("125px");

  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };

  const [currentText, setCurrentText] = useState(rawText);

  const formTextStyle = !showTextForm ? { display: 'none' } : {
    position: 'relative',
    left: '20%'
  }

  useEffect(() => {
    getData();
  }, [currentText])


  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();
    if (!doc.exists) {
      console.log('no data')
    } else {
      setData(doc.data());
      setSelectHeaders(doc.data().selectHeaders)
      setFetchedTexts([
        { id: 'title', content: doc.data().title.content, style: doc.data().title.style },
        { id: 'subtitle', content: doc.data().subtitle.content, style: doc.data().subtitle.style },
      ])
    }
  }

  const getCurrentText = e => {
    const newText = fetchedTexts.filter(text => {
      return text.id === e.target.id;
    })

    setCurrentText(newText[0])
  }

  const handleChangeText = e => {
    setCurrentText({ ...currentText, content: e.target.innerText, id: e.target.id })
  }

  const onSelectedText = (text, currentText) => {
    return (
      editMode && showTextForm && text.id === currentText.id &&
      <TextEdit
        currentText={currentText}
        formTextStyle={formTextStyle}
        setShowForm={setShowTextForm}
        save={handleSubmitText}
      />
    )
  }

  const handleSubmitText = async () => {
    switch (currentText.id) {
      case 'title':
        await firestore.collection(topicName.admin).doc(cityId).update({ "title.content": currentText.content, "title.style": currentText.style });
        break;
      case 'subtitle':
        await firestore.collection(topicName.admin).doc(cityId).update({ "subtitle.content": currentText.content, "subtitle.style": currentText.style });
        break;
      default:
        break;
    }

    setShowTextForm(false)
  }


  //for the selected list
  const handleSelect = () => {
    setShowList(!showList);
    setHeight(topicName.name === 'education' ? 180 : 138)
  };

  const handleList = (e) => {
    setSelect(e.target.innerText);
    setShowList(false);
  };

  return (
    <Fragment>
      <div
        className='section_header'
        style={{ backgroundImage: `url(${data.mainImg || data.bannerImg})`, }}
      >
        {/* texts part */}
        <div className='headers' style={{ textAlign: 'center' }}>

          {fetchedTexts.map(text =>
            <Fragment key={text.id}>
              <div>{onSelectedText(text, currentText)}</div>
              <p
                id={text.id}
                name={text.id}
                contentEditable={contentEditable}
                suppressContentEditableWarning='true'
                style={{ ...editStyle, ...text.style }}
                onFocus={getCurrentText}
                onBlur={handleChangeText}
                onClick={() => setShowTextForm(true)}
                name='title'
              >
                {text.content}
              </p>
            </Fragment>
          )}
          <a className='link' href='#'>
            <button className='linkBtn' style={{ backgroundColor: '#f24b6a', color: '#ecf0f1', borderRadius: 10, fontSize: 20, height: 60, width: 150, fontWeight: 700, border: '0px' }}>
              Join us
            </button>
          </a>
        </div>

        {((topicName.name === 'accomodation') || (topicName.name === 'education')) &&
          <div className={styles.selectperson}>
            <span>I am a</span>
            <span>
              <input
                type="text"
                placeholder="Person who will stay for a long term"
                value={select}
                readOnly={true}
                onClick={handleSelect}
              />

              <IconContext.Provider
                value={{
                  className: "arrowDown",
                  style: { transform: showList && "rotate(180deg)" },
                }}
              >
                <IoIosArrowDown className={styles.arrowDown} />
              </IconContext.Provider>

              <nav style={{ height: showList && height }}>
                <ul>
                  {selectHeaders && selectHeaders.map((s, index) =>
                    <li key={index} onClick={handleList}>
                      {s}
                    </li>
                  )}
                </ul>
              </nav>
            </span>
          </div>
        }
      </div>
    </Fragment>
  )
}

export default HeaderContent
