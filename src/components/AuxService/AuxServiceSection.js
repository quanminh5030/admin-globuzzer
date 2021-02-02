import React, {useState, useEffect} from 'react';
import AuxService from './AuxService';
import { firestore, app } from "../../utils/firebase.utils";
import "../../css/Home.css";
import ServiceForm from '../../pages/Admin/ServiceForm/ServiceForm';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { sizeTransform } from '../../utils/sizeTransform';

const AuxServiceSection = () => {
    const [services, setServices] = useState([]);
    const [display, setDisplay] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const initialServiceState = [
        {id:null, des:"", logo:"", link:"", name:""},
    ];
    const [currentService, setCurrentService] = useState(initialServiceState);

    useEffect(()=>{
        const unsubscribe = firestore.collection("services").orderBy("name").onSnapshot((snapshot)=> {
            const newService = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(newService);
        });
        return () => unsubscribe();
    },[]);

    const displayEditForm = (data) => {
        setDisplay(true);
        setCurrentService({
            id: data.id,
            des: data.des,
            logo: data.logo,
            link: data.link,
            name: data.name
        })
    };

    const updateService = (({currentService}, updatedService)=> {
        setDisplay(false);
        firestore.collection("services").doc(currentService.id).update(updatedService);
    });

    const deleteWarning = () => {
        setDisplay(false);
        setShowWarning(true);
    };

    const deleteService = async (data) => {
        await firestore.collection('services').doc(data.id).delete();
        setShowWarning(false);
    };

    //validations
    const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
    const sizeValidation = 200000;
    const message = (file) => {
      return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
    };

    const onFileChange = async (e) => {
      const file = e.target.files[0];
      const storageRef = app.storage().ref();
      
      if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) 
      {
        const fileRef = storageRef.child(`services/${file.name}`);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
      } else {
        alert(message(file))
      }     
    };

    const warningForm = (data) => {
      return (
        <div className="warningBox">
          <div className="warningHeader">Warning</div>
          <div className="warningText">
          {`Are you sure you want to DELETE "${data.name}" service?`}
          </div>
          <div className="warningActions">
            <p onClick={() => deleteService(data)}>Yes</p>
            <p onClick={() => setShowWarning(false)}>No</p>
          </div>
        </div>
      );
    }

    const onSelectedService = (data, service) => {
      if (data.id === service.id) {
        return (
          display ?
          <div>
            <ServiceForm 
              setDisplay={setDisplay} 
              currentService={currentService} 
              updateService={updateService} 
              deleteService={deleteWarning}
              onFileChange={onFileChange}
              fileUrl={fileUrl}
            />
          </div> : showWarning ? 
          <div>{warningForm(data)}</div> : null
        );
      }
    };
    
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              // infinite: true,
              // dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 1,
              // initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };

    const renderedServices = () => {
      return (
        services.map((data) => (
          <div key={data.id}>
                  <AuxService 
                      data={data} 
                      editService={()=> displayEditForm(data)} 
                  />
              {onSelectedService(data, currentService)}
          </div>
        ))
      );
      
    };

    return (
      <div className="aux_list" style={{display: services.length > 4 ? '' : 'flex'}}>
       {services.length <= 4 ? 
         renderedServices() : 
         <Slider {...settings}>{renderedServices()}</Slider>
       }
      </div>
    );
}

export default AuxServiceSection;
