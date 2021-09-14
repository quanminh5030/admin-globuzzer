import { accomodationObj } from "../pages/Admin/AdminTopic/RawAccomodationData";
import { attractionObj } from "../pages/Admin/AdminTopic/RawAttractionData";
import { cultureObj } from "../pages/Admin/AdminTopic/RawCultureData";
import { transportObj } from "../pages/Admin/AdminTopic/RawTransportData";

export default [
    { title: "Attractions", path: { admin: 'attraction_items', live: 'attraction_live', dataObj: attractionObj, name: 'attraction', firstBanner: 'churches' } },
    { title: "Accommation", path: { admin: 'accomodation_items', live: 'accomodation_live', dataObj: accomodationObj, name: 'accomodation', firstBanner: 'visa issue' } },
    { title: "Local Culture", path: { admin: 'culture_items', live: 'culture_live', dataObj: cultureObj, name: 'culture', firstBanner: 'currency' } },
    { title: "Events", path: { admin: 'event_items', live: 'event_live', name: 'event' } },

    { title: "Transportation", path: { admin: 'transport_items', live: 'transport_live', dataObj: transportObj, name: 'transportation', firstBanner: 'flight' } },

    { title: "Entertainment", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Education", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Sports & Activities", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Health & Emergency", path: { admin: 'attraction_items', live: 'attraction_live' } },
    { title: "Internet Service", path: { admin: 'attraction_items', live: 'attraction_live' } }
];
