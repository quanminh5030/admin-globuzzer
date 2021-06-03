import React, { useContext } from 'react'
import { EditContext } from '../../../contexts/editContext'
import "../../../css/Home.css"
import styles from '../../Section/index.module.css'
import AccoHeader from '../../Topic/AccoHeader'

const MainAccomodation = () => {

  const { editMode } = useContext(EditContext)

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <AccoHeader
          contentEditable={editMode ? true : false}
        />
      </div>


      {/* <section className="section_value">
        <div>
          <FeatureCardPage />
        </div>
      </section> */}
    </div>
  )
}

export default MainAccomodation
