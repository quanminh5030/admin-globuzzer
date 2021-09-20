import { accomodationObj } from "../pages/Admin/AdminTopic/RawAccomodationData";
import { attractionObj } from "../pages/Admin/AdminTopic/RawAttractionData";
import { cultureObj } from "../pages/Admin/AdminTopic/RawCultureData";
import { educationObj } from "../pages/Admin/AdminTopic/RawEducation";
import { transportObj } from "../pages/Admin/AdminTopic/RawTransportData";
import { careerObj } from "../pages/Admin/AdminTopic/RawCareerData";

export default [
    { title: "Attractions", path: { admin: 'attraction_items', live: 'attraction_live', dataObj: attractionObj, name: 'attraction', firstBanner: 'churches' } },
    { title: "Accommation", path: { admin: 'accomodation_items', live: 'accomodation_live', dataObj: accomodationObj, name: 'accomodation', firstBanner: 'visa issue' } },
    { title: "Local Culture", path: { admin: 'culture_items', live: 'culture_live', dataObj: cultureObj, name: 'culture', firstBanner: 'currency' } },
    { title: "Transportation", path: { admin: 'transport_items', live: 'transport_live', dataObj: transportObj, name: 'transportation', firstBanner: 'flight' } },
    { title: "Education", path: { admin: 'education_items', live: 'education_live', dataObj: educationObj, name: 'education', firstBanner: 'application' } },

    { title: "Career", path: { admin: 'career_items', live: 'career_live', dataObj: careerObj, name: 'career', firstBanner: 'writing your cv' } },

    { title: "Entertainment", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Sports & Activities", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Health & Emergency", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Internet Service", path: { admin: 'attraction_items', live: 'attraction_live' } }
];
