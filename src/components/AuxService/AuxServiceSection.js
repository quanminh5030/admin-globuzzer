import React, {useState, useEffect} from 'react';
import AuxService from './AuxService';
import { firestore } from "../../utils/firebase.utils";
import "../../css/Home.css";
import ServiceForm from '../../pages/Admin/ServiceForm/ServiceForm';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const AuxServiceSection = () => {
    const [services, setServices] = useState([]);
    const [display, setDisplay] = useState(false);
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

    const deleteService = (data) => {
        setDisplay(false);
        // firestore.collection("services").doc(data).delete();
        console.log("do you want to delete this???:",data)
    }

    const onSelectedService = (data, service) => {
        return (
            data.id === service.id &&
            display &&
            <div>
                <ServiceForm 
                    setDisplay={setDisplay} 
                    currentService={currentService} 
                    updateService={updateService} 
                    deleteService={deleteService} 
                />
            </div>
        );
    };
    
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              // infinite: true,
              // dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              // initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
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
