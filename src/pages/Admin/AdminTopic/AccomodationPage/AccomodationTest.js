import React, { useEffect, useState } from 'react'
import { firestore } from '../../../../utils/firebase.utils';
import '../../../../css/Home.css'
import { createMuiTheme, FormControl, Select, ThemeProvider } from '@material-ui/core'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {

      }
    }
  }
})

const AccomodationTest = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconArrowDown, setIconArrowDown] = useState(true)

  useEffect(() => {
    getBanners();
  }, [])


  const getBanners = async () => {
    const doc = await firestore.collection('topic_items').doc('accomodation').get(); //hard code for the time being
    if (!doc.exists) {
      setLoading(true);
    } else {
      setBanners(doc.data().helsinki)
    }
  }

  return (
    <div
      className='section_header'
      style={{ backgroundImage: `url(${banners.banner})` }}
    >
      {/* texts part */}
      <div className='headers' style={{ textAlign: 'center' }}>
        <p></p>
        <p>
          {banners.title}
        </p>
        <p></p>
        <p>
          {banners.subtitle}
        </p>

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
                {banners.options && banners.options.map(b => <option>{b}</option>)}
              </Select>
            </FormControl>
          </ThemeProvider>
        </span>
      </div>

    </div>
  )
}

export default AccomodationTest
