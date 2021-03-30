import { v4 as uuidv4 } from 'uuid';

export const dataObj = 
{
  name: "New section soon...",
  url: "",
  bannerImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fbackground.jpg?alt=media&token=116823b4-8224-4268-9ace-b62dfc71e18f",
  placeOne: {
    color: "",
    link: "",
    text: "Attractions",
  },
  placeTwo: {
    color: "",
    link: "",
    text: "Career",
  },
  placeThree: {
    color: "",
    link: "",
    text: "Culture",
  },
  title: {
    content: "Here is your main title",
    style: {
      color: "#ffffff",
      fontSize: "48px",
      fontWeight: "bold",
      textAlign: "center",
    }
  },
  subtitle: {
    content: "and here is your description",
    style: {
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
    }
  },
  services: [
    {
      title: "Flight", 
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fservices%2Fflight.svg?alt=media&token=c2c5206e-7b09-4cee-9039-cf39df13de5f",
      id: uuidv4(),
      url: "www",
      text: ""
    },
    {
      title: "Hotel", 
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fservices%2Fhotel.svg?alt=media&token=56d58a1b-31fe-4070-b6c7-a46ecc7744e8",
      id: uuidv4(),
      url: "www",
      text: ""
    },
    {
      title: "Event", 
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fservices%2Fevent.svg?alt=media&token=4c7bd019-2066-42cd-a05e-10e341dbe707",
      id: uuidv4(),
      url: "www",
      text: ""
    },
  ],
  news: [
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fnews%2Fslider-banner.jpg?alt=media&token=80ea0999-d1e9-4604-a283-a117c0e1e11f",
      link: "",
      text: "Google launches educational coronavirus website",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fnews%2Fslider-banner.jpg?alt=media&token=80ea0999-d1e9-4604-a283-a117c0e1e11f",
      link: "",
      text: "News 2",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fnews%2Fslider-banner.jpg?alt=media&token=80ea0999-d1e9-4604-a283-a117c0e1e11f",
      link: "",
      text: "News 3",
      id: uuidv4(),
    }
  ],
  topics: [
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Faccomodations.jpg?alt=media&token=f7c831f8-c503-4f08-844f-7e692c282e14",
      link: "www",
      text: "Accomodations",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fattractions.jpg?alt=media&token=f7e2e8da-288d-49f9-ab08-49423307fac0",
      link: "www",
      text: "Attractions",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fculture.jpg?alt=media&token=465b1c15-bb4b-4307-92b7-a36014ed412f",
      link: "www",
      text: "Culture",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Feducation.jpg?alt=media&token=332d54eb-eadd-4dd0-ad4d-5ff4c58cee4c4",
      link: "www",
      text: "Education",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fevents.jpg?alt=media&token=b9f5fffd-bfad-408e-9f8c-83b4e341ba4d",
      link: "www",
      text: "Events",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fhealth.jpg?alt=media&token=ce04d87b-7f3b-4ea1-b391-5dc0d83336be",
      link: "www",
      text: "Health",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Finternet.jpg?alt=media&token=8e8122ef-494f-4eba-bfb1-b66c4af40d4e",
      link: "www",
      text: "Internet",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fparty.jpg?alt=media&token=91f1cbab-4601-45c5-acfe-e403cf711b18",
      link: "www",
      text: "Party",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Fsport.jpg?alt=media&token=793517f6-ea9e-449c-8c59-aa59612aca92",
      link: "www",
      text: "Sport",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Feducation.jpg?alt=media&token=332d54eb-eadd-4dd0-ad4d-5ff4c58cee4c4",
      link: "www",
      text: "Education",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Feducation.jpg?alt=media&token=332d54eb-eadd-4dd0-ad4d-5ff4c58cee4c4",
      link: "www",
      text: "Education",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Feducation.jpg?alt=media&token=332d54eb-eadd-4dd0-ad4d-5ff4c58cee4c4",
      link: "www",
      text: "Education",
      id: uuidv4(),
    },
    {
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Ftopics%2Feducation.jpg?alt=media&token=332d54eb-eadd-4dd0-ad4d-5ff4c58cee4c4",
      link: "www",
      text: "Education",
      id: uuidv4(),
    }
  ],
  members: [
    {
      name: "Asya",
      flags: "#cook #sport",
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fmembers%2FAsya.83b916c8.jpg?alt=media&token=fee36f56-406d-43a8-ad41-03fa90eaf2b4",
      id: uuidv4(),
    },
    {
      name: "Chloe",
      flags: "#design #sport",
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fmembers%2Fchloe.jpeg?alt=media&token=c667f77e-ae5c-43b3-ab82-535092948bcc",
      id: uuidv4(),
    },
    {
      name: "Michael",
      flags: "#design #sport",
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fmembers%2Fmichael.jpeg?alt=media&token=f68e4e02-0020-4559-b530-37c0fd6cefec",
      id: uuidv4(),
    },
    {
      name: "Gabriela",
      flags: "#cook #sport",
      image: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fmembers%2FGabriela.03f835cd.jpg?alt=media&token=9a127f38-c4a2-444a-ba7f-6e9315aa4240",
      id: uuidv4(),
    }
  ],
  articles: [
    {
      coverImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-one.jpg?alt=media&token=ffc00a1c-64e7-4611-979e-823f5f984039",
      title: "Helsinki design district",
      link: "",
      authImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-author.jpg?alt=media&token=59340231-32e8-4813-bcc4-a601914bdecb",
      authName: "Sofia",
      likes: "300",
      id: uuidv4(),
    },
    {
      coverImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-two.jpg?alt=media&token=e5f5a035-1f95-4c06-8e85-dffb862e3570",
      title: "Modern art museum",
      link: "",
      authImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2FJonathan.png?alt=media&token=f2e0a177-b2dc-4ecd-b39d-8a63baf13b3c",
      authName: "Jonathan",
      likes: "2k",
      id: uuidv4(),
    },
    {
      coverImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-three.jpg?alt=media&token=fdfc0757-ec54-498e-ba40-ff12600f66a6",
      title: "Theaters you must visit",
      link: "",
      authImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2FGunjan.png?alt=media&token=0e555f25-4c62-4571-8fcb-565c8cc7f001",
      authName: "Gujan",
      likes: "785",
      id: uuidv4()
    },
    {
      coverImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-four.jpg?alt=media&token=41d6be9a-8bfb-49a2-a043-7d4964b51a04",
      title: "Architecture in Helsinki",
      link: "",
      authImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2FGabriela.png?alt=media&token=22893eba-2ba6-4be7-8554-0a4847eeee50",
      authName: "Gabriela",
      likes: "13k",
      id: uuidv4()
    },
    {
      coverImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2Farticle-four.jpg?alt=media&token=41d6be9a-8bfb-49a2-a043-7d4964b51a04",
      title: "Architecture in Helsinki",
      link: "",
      authImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Farticles%2FGabriela.png?alt=media&token=22893eba-2ba6-4be7-8554-0a4847eeee50",
      authName: "Gabriela",
      likes: "13k",
      id: uuidv4()
    },
    
  ],
  advertisements: [
    {
      logo: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fadvertisements%2Fvimeo.png?alt=media&token=b1b8c27f-8737-4531-909c-73c4fb5ab57c",
      bgColor: "#5ebfbf",
      btColor: "#f2a413",
      link: "www.vimeo.com",
      text1: "Customizable Player",
      text2: "A Vimeo Feature",
      id: uuidv4(),
    },
    {
      logo: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fadvertisements%2Fvimeo.png?alt=media&token=b1b8c27f-8737-4531-909c-73c4fb5ab57c",
      bgColor: "#5ebfbf",
      btColor: "#f2a413",
      link: "www.vimeo.com",
      text1: "Customizable Player",
      text2: "A Vimeo Feature",
      id: uuidv4(),
    },
    {
      logo: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fadvertisements%2Fvimeo.png?alt=media&token=b1b8c27f-8737-4531-909c-73c4fb5ab57c",
      bgColor: "#5ebfbf",
      btColor: "#f2a413",
      link: "www.vimeo.com",
      text1: "Customizable Player",
      text2: "A Vimeo Feature",
      id: uuidv4(),
    }
  ],
  videos: [
    {
        id: uuidv4(),
        url: "https://www.youtube.com/embed/yawXq5TlgBU",
        text: "Visit Helsinki",
        coverImg: "https://images.unsplash.com/photo-1507495951994-cfcf20e10ce0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1465&q=80"
    },
    {
        id: uuidv4(),
        url: "https://www.youtube.com/embed/MQSRSfnUtTo",
        text: "Globuzzer Is Visiting Helsinki!",
        coverImg: ""
    },
    {
        id: uuidv4(),
        url: "https://www.youtube.com/embed/nC5A7IK7ws8",
        text: "Student benefits Helsinki",
        coverImg: ""
    }
  ],
};

