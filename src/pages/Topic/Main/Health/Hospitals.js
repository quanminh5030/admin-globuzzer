import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Health.module.css';

const Hospitals = ({ hospitals, open, setOpen, city }) => {
  const [data, setData] = useState([]);

  const handleClose = () => {
    setOpen(false)
  };

  useEffect(async () => {
    const hospitalsHasPhoto = hospitals.filter(h => h.photos);
    const hospitalsNewArr = [];

    let results = hospitalsHasPhoto.map(h => AxiosService.getHospitalPhoto(h.photos.photo_reference));
    results = await Promise.all(results)

    for (let i = 0; i < hospitalsHasPhoto.length; i++) {
      const hospitalObj = hospitalsHasPhoto[i];
      hospitalObj.imgUrl = results[i].data;

      hospitalsNewArr.push(hospitalObj)
    }

    console.log(hospitalsNewArr)
    setData(hospitalsNewArr);
  }, [])

  return (
    <Dialog
      onClose={handleClose} open={open}
    >
      <DialogTitle
        className={styles.title}
      >Hospitals in {city}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data
          .map((h) => {
            return (
              <ListItem
                button
                key={h.name}
                divider={true}
                className={styles.hospital}
              >
                <div>
                  <img src={h.imgUrl} alt={h.name} />
                </div>
                <div className={styles.info} >
                  <ListItemText
                    primary={h.name}
                    primaryTypographyProps={{
                      color: 'white',
                      fontWeight: 'bold',
                      
                    }}
                    secondary={h.address}
                    secondaryTypographyProps={{
                      color: 'white',
                      className: styles.name
                    }}
                  />

                  <button>Explore more</button>

                </div>
              </ListItem>
            )

          })}
      </List>
    </Dialog>
  )
}

export default Hospitals

