import {Book, Events, Globe, Home, Screen, User} from "@carbon/icons-react";

/**
 * Data for the Resources tiles
 */
export const resources = [
    { title: "University Homepage", link: "https://www.nottingham.ac.uk/", icon: <Globe size={64} /> },
    { title: "Library Services", link: "https://www.nottingham.ac.uk/library/", icon: <Book size={64} /> },
    { title: "Student Portal", link: "https://studentlife.nottingham.ac.uk/students/login?ReturnUrl=%2fstudents", icon: <User size={64} /> },
    { title: "NottinghamHub", link: "https://campus.nottingham.ac.uk/psp/csprd/?cmd=login", icon: <Home size={64} /> },
    { title: "IT Service", link: "https://www.nottingham.ac.uk/dts/help/it-service-desk/it-service-desk.aspx", icon: <Screen size={64} /> },
    { title: "Student Society", link: "https://su.nottingham.ac.uk/societies", icon: <Events size={64} /> },
];