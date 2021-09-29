import { v4 as uuidv4 } from 'uuid';

export const transportObj = {
  city: "",
  IATA_code: '',
  lat: '',
  lng: '',
  bannerImg: "https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fbackground.jpg?alt=media&token=116823b4-8224-4268-9ace-b62dfc71e18f",
  mainImg: '',
  advertisements: [
    {
      link: 'https://globuzzer-topics.web.app/',
      logo: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FvimeoLogo.png?alt=media&token=60a9d2f9-69b5-442d-87c5-58aa48cb53ab',
      bgColor: '#5ebfbf',
      btColor: '#f2a413',
      text1: 'Add the title...',
      text2: 'Add the subtitle...',
      id: uuidv4(),
    },
    {
      link: 'https://globuzzer-topics.web.app/',
      logo: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fnews%2FGB_ADD_page1.png?alt=media&token=1d187b44-d764-4beb-90f6-9b458a88d0dd',
      bgColor: '#5ebfbf',
      btColor: '#f2a413',
      text1: 'Add the title...',
      text2: 'Add the subtitle...',
      id: uuidv4(),
    },
    {
      link: 'https://globuzzer-topics.web.app/',
      logo: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/section%2Fadvertisements%2Fvimeo.png?alt=media&token=b1b8c27f-8737-4531-909c-73c4fb5ab57c',
      bgColor: '#5ebfbf',
      btColor: '#f2a413',
      text1: 'Add the title...',
      text2: 'Add the subtitle...',
      id: uuidv4(),
    },
  ],

  articleData: [
    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

    {
      article: {
        articleId: uuidv4(),
        articleLink: 'https://www.google.com/',
        content: 'Lorem ipsum...',
        title: 'Article  subtitle here',
        img: {
          path: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
          title: 'Some text below image',
        }
      },
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Farticle_bg.jpg?alt=media&token=0394596e-45fa-4a49-9a95-04970f3a6444',
      liked: false,
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Article main title here',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FwomanBlack.png?alt=media&token=02af702c-c05e-4c5c-b888-96ff10863f7f',
      videoId: 'yawXq5TlgBU',
    },

  ],

  banner: [
    {
      content: 'Insert the content here...',
      icon: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Ftransport%2Fflight.svg?alt=media&token=2bbae6c2-7b49-489f-8675-4fa4ed7ad77e',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-1.png?alt=media&token=7f2b7994-e6f0-4452-bf4e-fbc6653a3672',
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      title: 'Flight',
      videoId: 'yawXq5TlgBU',
    },
    {
      content: 'Insert the content here...',
      icon: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Ftransport%2Ftrain.svg?alt=media&token=def1c7c1-903d-40fb-bd85-65963af9fc07',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-1.png?alt=media&token=7f2b7994-e6f0-4452-bf4e-fbc6653a3672',
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      title: 'Train',
      videoId: 'yawXq5TlgBU',
    },
    {
      content: 'Insert the content here...',
      icon: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Ftransport%2Fcar.svg?alt=media&token=b2d99e2b-39c9-42b6-aed5-d29277ef5f20',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-1.png?alt=media&token=7f2b7994-e6f0-4452-bf4e-fbc6653a3672',
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      title: 'Car',
      videoId: 'yawXq5TlgBU',
    },
    {
      content: 'Insert the content here...',
      icon: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Ftransport%2Fbus.svg?alt=media&token=338dcac5-b371-4473-a3f9-45264631dc61',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-1.png?alt=media&token=7f2b7994-e6f0-4452-bf4e-fbc6653a3672',
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      title: 'Bus',
      videoId: 'yawXq5TlgBU',
    },
  ],

  topMembers: [
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

  otherTopic: [
    {
      description: 'Add a city name here',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-2.png?alt=media&token=36ba590c-bdc8-468f-8ee7-372eb929b5ad',
      link: 'https://www.google.com/',
      title: 'Add a title...'
    },
    {
      description: 'Add a city name here',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-2.png?alt=media&token=36ba590c-bdc8-468f-8ee7-372eb929b5ad',
      link: 'https://www.google.com/',
      title: 'Add a title...'
    },
    {
      description: 'Add a city name here...',
      id: uuidv4(),
      img: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fother-2.png?alt=media&token=36ba590c-bdc8-468f-8ee7-372eb929b5ad',
      link: 'https://www.google.com/',
      title: 'Add a title...'
    },

  ],

  news: [
    {
      id: uuidv4(),
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fmask.png?alt=media&token=3b863fec-2b7a-4a82-b94e-4ee43225307b',
      link: 'https://globuzzer.com/',
      text: 'Add the title...'
    },
    {
      id: uuidv4(),
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fmask.png?alt=media&token=3b863fec-2b7a-4a82-b94e-4ee43225307b',
      link: 'https://globuzzer.com/',
      text: 'Add the title...'
    },
    {
      id: uuidv4(),
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fmask.png?alt=media&token=3b863fec-2b7a-4a82-b94e-4ee43225307b',
      link: 'https://globuzzer.com/',
      text: 'Add the title...'
    },
  ],

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

  videoData: [
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    },
    {
      id: uuidv4(),
      imgPath: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fcard_banner.png?alt=media&token=d50139b2-17b4-4d2a-bfab-13655d3d51d2',
      likes: 0,
      link: 'https://www.youtube.com/watch?v=yawXq5TlgBU',
      name: 'Username',
      title: 'Add the title here...',
      userImg: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2FcasualBoy.png?alt=media&token=4806da00-9d47-472f-8b8e-054faea967c1',
      videoId: 'yawXq5TlgBU'
    }
  ],

  otherTransport: [
    {
      id: uuidv4(),
      name: 'Subway & bus',
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2FotherTransportDemo.svg?alt=media&token=3301f43d-133c-4a81-89cb-bf7c99e050f2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore.',
      link: 'https://globuzzer.com/'
    },
    {
      id: uuidv4(),
      name: 'Subway & bus',
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2FotherTransportDemo.svg?alt=media&token=3301f43d-133c-4a81-89cb-bf7c99e050f2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore.',
      link: 'https://globuzzer.com/'
    },
    {
      id: uuidv4(),
      name: 'Subway & bus',
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2FotherTransportDemo.svg?alt=media&token=3301f43d-133c-4a81-89cb-bf7c99e050f2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore.',
      link: 'https://globuzzer.com/'
    },
    {
      id: uuidv4(),
      name: 'Subway & bus',
      image: 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2FotherTransportDemo.svg?alt=media&token=3301f43d-133c-4a81-89cb-bf7c99e050f2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore.',
      link: 'https://globuzzer.com/'
    }
  ]
}