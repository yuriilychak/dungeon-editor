import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const fetchLocale = () => fetch(`${process.env.PUBLIC_URL}/static/locale/eng.json`)
    .then(result => result.json())
    .then(data => i18n.use(initReactI18next).init(data));

export default fetchLocale;

