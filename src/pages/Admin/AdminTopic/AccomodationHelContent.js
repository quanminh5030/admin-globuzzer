import React, { useContext, useState } from 'react'
import { Navigation } from '../../../components/Navigation/Navigation';
import { EditContext } from '../../../contexts/editContext'
import styles from './AdminTopic.module.css';
import accomodation from '../../../assets/Helsinki/Hotel.svg'

const AccomodationHelContent = () => {
  console.log('here')
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button className={styles.editBtn} onClick={handleEditMode}>
        Edit it
      </button>

      <div>
        <header style={{backgroundColor: 'orange'}}>
        hello world
        </header>
      </div>

    </>
  )
}

export default AccomodationHelContent
