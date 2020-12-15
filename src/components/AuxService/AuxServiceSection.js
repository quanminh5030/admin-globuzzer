import React, {useState, useEffect} from 'react';
import AuxService from './AuxService';
import { firestore } from "../../utils/firebase.utils";
import "../../css/Home.css";
import ServiceForm from '../../pages/Admin/ServiceForm/ServiceForm';
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
        setServices(true);
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

    return (
     <div className="aux_list">
          {services.map((data) => (
            <AuxService key={data.id} data={data} editService={()=>displayEditForm(data)} />
          ))}
          {display && <div>
            <ServiceForm setDisplay={setDisplay} currentService={currentService} updateService={updateService}/>
        </div>
        }
        </div>
    );
}

export default AuxServiceSection;
