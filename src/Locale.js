import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Localisation from "./Localisation.json";

i18n.use(initReactI18next).init(Localisation);
