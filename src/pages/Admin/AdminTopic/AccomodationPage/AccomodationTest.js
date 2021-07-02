import React, { Fragment, useContext, useEffect, useState } from 'react'
import { firestore } from '../../../../utils/firebase.utils';
import '../../../../css/Home.css'
import { createMuiTheme, FormControl, Select, ThemeProvider } from '@material-ui/core'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import { EditContext } from '../../../../contexts/editContext';
import TextEdit from '../../../../components/TextEdit/TextEdit';
import BannerPhotoForm from '../../BannerForm/SectionBannerPhotoForm';

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {

      }
    }
  }
})

const AccomodationTest = ({ contentEditable }) => {
  const { editStyle, editMode } = useContext(EditContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconArrowDown, setIconArrowDown] = useState(true)
  const [showTextForm, setShowTextForm] = useState(false)
  //for the title and subtitle
  const [fetchedTexts, setFetchedTexts] = useState([]);

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
    const doc = await firestore.collection('topic_items').doc('accomodation').get(); //hard code for the time being
    if (!doc.exists) {
      setLoading(true);
    } else {
      setData(doc.data().helsinki);
      setFetchedTexts([
        { id: 'title', content: doc.data().helsinki.title.content, style: doc.data().helsinki.title.style },
        { id: 'subtitle', content: doc.data().helsinki.subtitle.content, style: doc.data().helsinki.subtitle.style },
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
        await firestore.collection('topic_items').doc('accomodation').update({ "helsinki.title.content": currentText.content, "helsinki.title.style": currentText.style });
        break;
      case 'subtitle':
        await firestore.collection('topic_items').doc('accomodation').update({ "helsinki.subtitle.content": currentText.content, "helsinki.subtitle.style": currentText.style });
        break;
      default:
        break;
    }

    setShowTextForm(false)
  }

  return (
    <Fragment>
      <div
        className='section_header'
        style={{ backgroundImage: `url(${data.banner})` }}
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

        {/* select options */}
        <div style={{ marginTop: 50 }}>
          <span style={{ marginRight: 7, fontSize: 24 }}>I am a</span>

          <span>
            <ThemeProvider theme={theme}>
              <FormControl variant='outlined'>
                <Select
                  native
                  variant='filled'
                  style={{ color: '#2f2f2f', borderRadius: 10, borderColor: 'white', backgroundColor: 'white', height: 40, verticalAlign: 'center', paddingBottom: 17 }}
                  IconComponent={iconArrowDown ? KeyboardArrowDownOutlinedIcon : KeyboardArrowUpOutlinedIcon}
                  onClick={() => setIconArrowDown(!iconArrowDown)}
                >
                  {data.options && data.options.map((b, index) => <option key={index}>{b}</option>)}
                </Select>
              </FormControl>
            </ThemeProvider>
          </span>
        </div>

      </div>
    </Fragment>
  )
}

export default AccomodationTest
