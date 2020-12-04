import amsterdam from "../assets/Home/Amsterdam.jpg";
import barcelona from "../assets/Home/Barcelona.jpg";
import belgrade from "../assets/Home/Belgrade.jpg";
import budapest from "../assets/Home/Budapest.jpg";
import copenhagen from "../assets/Home/Copenhagen.jpg";
import helsinki from "../assets/Home/Helsinki.jpg";
import jakarta from "../assets/Home/Jakarta.jpg";
import lahore from "../assets/Home/Lahore.jpg";
import lisbon from "../assets/Home/Lisbon.jpg";
import london from "../assets/Home/London.jpg";
import la from "../assets/Home/Los-Angeless.jpg";
import milan from "../assets/Home/Milan.jpg";
import nis from "../assets/Home/Nis.jpg";
import oslo from "../assets/Home/Oslo.jpg";
import paris from "../assets/Home/Paris.jpg";
import rome from "../assets/Home/Rome.jpg";
import sf from "../assets/Home/San-Francisco.jpg";
import stockholm from "../assets/Home/Stockholm.jpg";
import toronto from "../assets/Home/Toronto.jpg";
import vilnius from "../assets/Home/Vilnius.jpg";
import zagreb from "../assets/Home/Zagreb.jpg";

const CITY_DATA =  [
  {
    name: "Stockholm",
    img: stockholm,
    members: 2898,
    url: "https://globuzzer.mn.co/groups/195831/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195831%3Fautojoin%3D1&space_id=195831",
  },
  {
    name: "Helsinki",
    img: helsinki,
    members: 2104,
    url: "https://globuzzer.mn.co/groups/195832/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195832%3Fautojoin%3D1&space_id=195832",
  },
  {
    name: "Lahore",
    img: lahore,
    members: 85,
    url: "https://globuzzer.mn.co/groups/387773/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F387773%3Fautojoin%3D1&space_id=387773",
  },
  {
    name: "Toronto",
    img: toronto,
    members: 86,
    url: "https://globuzzer.mn.co/groups/466728/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F466728%3Fautojoin%3D1&space_id=466728",
  },
  {
    name: "London",
    img: london,
    members: 226,
    url: "https://globuzzer.mn.co/groups/195344/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195344%3Fautojoin%3D1&space_id=195344",
  },
  {
    name: "Copenhagen",
    img: copenhagen,
    members: 1865,
    url: "https://globuzzer.mn.co/groups/322063/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F322063%3Fautojoin%3D1&space_id=322063",
  },
  {
    name: "Lisbon",
    img: lisbon,
    members: 92,
    url: "https://globuzzer.mn.co/groups/446233/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F446233%3Fautojoin%3D1&space_id=446233",
  },
  {
    name: "Rome",
    img: rome,
    members: 180,
    url: "https://globuzzer.mn.co/groups/195833/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195833%3Fautojoin%3D1&space_id=195833",
  },
  {
    name: "Oslo",
    img: oslo,
    members: 1572,
    url: "https://globuzzer.mn.co/groups/268471/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F268471%3Fautojoin%3D1&space_id=268471",
  },
  {
    name: "Amsterdam",
    img: amsterdam,
    members: 12,
    url: "https://globuzzer.mn.co/groups/2186309/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F2186309%3Fautojoin%3D1&space_id=2186309",
  },
  {
    name: "Barcelona",
    img: barcelona,
    members: 143,
    url: "https://globuzzer.mn.co/groups/195835/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195835%3Fautojoin%3D1&space_id=195835",
  },
  {
    name: "Los Angeles",
    img: la,
    members: 30,
    url: "https://globuzzer.mn.co/groups/1338914/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F1338914%3Fautojoin%3D1&space_id=1338914",
  },
  {
    name: "Budapest",
    img: budapest,
    members: 11,
    url: "https://globuzzer.mn.co/groups/1681301/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F1681301%3Fautojoin%3D1&space_id=1681301",
  },
  {
    name: "San Francisco",
    img: sf,
    members: 126,
    url: "https://globuzzer.mn.co/groups/312045/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F312045%3Fautojoin%3D1&space_id=312045",
  },
  {
    name: "Belgrade",
    img: belgrade,
    members: 155,
    url: "https://globuzzer.mn.co/groups/294024/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F294024%3Fautojoin%3D1&space_id=294024",
  },
  {
    name: "Niš",
    img: nis,
    members: 64,
    url: "https://globuzzer.mn.co/groups/321654/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F321654%3Fautojoin%3D1&space_id=321654",
  },

  {
    name: "Jakarta",
    img: jakarta,
    members: 678,
    url: "https://globuzzer.mn.co/groups/244080/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F244080%3Fautojoin%3D1&space_id=244080",
  },
  {
    name: "Milan",
    img: milan,
    members: 122,
    url: "https://globuzzer.mn.co/groups/258697/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F258697%3Fautojoin%3D1&space_id=258697",
  },
  {
    name: "Paris",
    img: paris,
    members: 141,
    url: "https://globuzzer.mn.co/groups/195834/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F195834%3Fautojoin%3D1&space_id=195834",
  },
  {
    name: "Zagreb",
    img: zagreb,
    members: 84,
    url: "https://globuzzer.mn.co/groups/403651/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F403651%3Fautojoin%3D1&space_id=403651",
  },
  {
    name: "Vilnius",
    img: vilnius,
    members: 175,
    url: "https://globuzzer.mn.co/groups/210260/feed",
    join: "https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2Fgroups%2F210260%3Fautojoin%3D1&space_id=210260",
  },
];

export default CITY_DATA;