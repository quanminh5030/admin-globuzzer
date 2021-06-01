import React from 'react'
import "../../../css/Home.css"
import styles from '../../Section/index.module.css'
import AccoHeader from '../../Topic/AccoHeader'

const MainAccomodation = () => {

  return (
    <div className={styles.section}>
      <div className={styles.header}>
          <AccoHeader />
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
