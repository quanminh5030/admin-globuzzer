import React, { useContext } from 'react'
import { EditContext } from '../../../contexts/editContext'
import "../../../css/Home.css"
import styles from '../../Section/index.module.css'
import Header from '../../Topic/Header/Header'
import Footer from '../../Topic/Footer/Footer'
import Body from '../../Topic/Main/Body'

const MainAccomodation = () => {

  const { editMode } = useContext(EditContext)

  return (
    <div className={styles.section}>
      <Header
        contentEditable={editMode ? true : false}
      />
      <Body />
      <Footer />
    </div>
  )
}

export default MainAccomodation
