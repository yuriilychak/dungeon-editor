import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {UI_SECTION} from "./enum";

export const JSON_DATA = {};

const pathPrefix = `${process.env.PUBLIC_URL}/static/`;

export const loadStatic = () => fetch(`${pathPrefix}locale/eng.json`)
    .then(result => result.json())
    .then(data => {
        i18n.use(initReactI18next).init(data);

        const sections = Object.keys(UI_SECTION);

        return Promise.all(
            sections.map(section => fetch(`${pathPrefix}json/${UI_SECTION[section]}.json`))
        ).then(configs => Promise.all(configs.map((config, index) =>
            config.json().then(configData => JSON_DATA[UI_SECTION[sections[index]]] = configData
                ))))
    });

