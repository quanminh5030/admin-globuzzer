import { accomodationObj } from "../pages/Admin/AdminTopic/RawAccomodationData";
import { attractionObj } from "../pages/Admin/AdminTopic/RawAttractionData";
import { cultureObj } from "../pages/Admin/AdminTopic/RawCultureData";
import { educationObj } from "../pages/Admin/AdminTopic/RawEducation";
import { transportObj } from "../pages/Admin/AdminTopic/RawTransportData";
import { careerObj } from "../pages/Admin/AdminTopic/RawCareerData";
import { foodObj } from "../pages/Admin/AdminTopic/RawFoodData";
import { healthObj } from "../pages/Admin/AdminTopic/RawHealthData";

export default [
    { title: "Accomodation", path: { admin: 'accomodation_admin', live: 'accomodations', dataObj: accomodationObj, name: 'accomodation', firstBanner: 'visa issue' } },


    { title: "Attractions", path: { admin: 'attraction_admin', live: 'attractions', dataObj: attractionObj, name: 'attraction', firstBanner: 'churches' } },

    { title: "Local Culture", path: { admin: 'culture_admin', live: 'culture', dataObj: cultureObj, name: 'culture', firstBanner: 'currency' } },

    { title: "Transportation", path: { admin: 'transport_admin', live: 'transportation', dataObj: transportObj, name: 'transportation', firstBanner: 'flight' } },

    { title: "Education", path: { admin: 'education_admin', live: 'education', dataObj: educationObj, name: 'education', firstBanner: 'application' } },

    { title: "Food", path: { admin: 'food_admin', live: 'foods', dataObj: foodObj, name: 'food', firstBanner: 'restaurant' } },

    { title: "Career", path: { admin: 'career_admin', live: 'career', dataObj: careerObj, name: 'career', firstBanner: 'writing your cv' } },

    
    { title: "Health & Emergency", path: { admin: 'health_items', live: 'health_live', dataObj: healthObj, name: 'health', firstBanner: 'hospital' } },

    // { title: "Entertainment", path: { admin: 'attraction_items', live: 'attraction_live' } },
    // { title: "Sports & Activities", path: { admin: 'attraction_items', live: 'attraction_live' } },

    // { title: "Internet Service", path: { admin: 'attraction_items', live: 'attraction_live' } }
];
