import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../../../../utils/firebase.utils";
import member from "./members.module.css";

function Members() {
  const { cityId } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const doc = await firestore.collection('accomodation_items').doc(cityId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setMembers(doc.data().member)
    }
  }

  return (
    <section className={member.container}>
      <header className={member.header}>
        Top members to meet<div className={member.underline}></div>
      </header>


      <div className={`${member.mdetails} ${member.bigscreen}`}>
        {members.map(m =>
          m.id != 3 ? (
            <div className={member.details} key={m.id}>
              <img src={m.img} alt="member img" />
              <header>{m.name}</header>

              <p>
                <span>#{m.job}</span>
                <span>#{m.country}</span>
              </p>
            </div>
          ) : (
            <div className={`${member.details} ${member.bigcircle}`} key={m.id}>
              <div className={member.innercircle}>
                <div className={member.front}>
                  <p>+</p>
                </div>
                <div className={member.back}>
                  <p>
                    <Link to="#" className={member.link}>
                      Join us
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Members;
