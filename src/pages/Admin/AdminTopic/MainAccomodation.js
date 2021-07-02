import React, { useContext } from 'react'
import { EditContext } from '../../../contexts/editContext'
import "../../../css/Home.css"
import styles from '../../Section/index.module.css'
import AccoHeader from '../../Topic/AccoHeader'
import Footer from '../../Topic/Footer/Footer'
import Body from '../../Topic/Main/Body'

const MainAccomodation = () => {

  const { editMode } = useContext(EditContext)

  return (
    <div className={styles.section}>
      <AccoHeader
        contentEditable={editMode ? true : false}
      />
      <Body />
      <Footer />
    </div>
  )
}

export default MainAccomodation
