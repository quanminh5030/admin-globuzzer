import { CircularProgress, Dialog, List, ListItem, ListItemText, Box } from '@mui/material';
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

  if (data.length > 0) {
    return (
      <Dialog
        onClose={handleClose} open={open}
      >
        <h2 className={styles.title}>
          Hospitals in {city}
        </h2>
        <List sx={{ pt: 0 }}>
          {data
            .map((h) => {
              const htmlLink = h.photos.html_attributions[0];

              const linkUrl = htmlLink.slice((htmlLink.indexOf('"') + 1), (htmlLink.indexOf('>') - 1))

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

                    <button onClick={() => window.open(linkUrl, '_blank')}>Explore more
                    </button>

                  </div>
                </ListItem>
              )

            })}
        </List>
      </Dialog>
    )
  } else {
    console.log('Loading...')
    return (
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <CircularProgress color='error' sx={{ margin: 1,}} />
      </Dialog>
    )
  }
}

export default Hospitals

