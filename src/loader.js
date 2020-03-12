import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {UI_SECTION, FILE_FORMAT} from "./enum";
import {addFormat} from "./helpers";

export const JSON_DATA = {};

const pathPrefix = `${process.env.PUBLIC_URL}/static/`;

const fetchJSON = path => fetch(addFormat(`${pathPrefix}${path}`, FILE_FORMAT.JSON));

export const loadStatic = () => fetchJSON('locale/eng')
    .then(result => result.json())
    .then(data => {
        i18n.use(initReactI18next).init(data);

        const sections = Object.keys(UI_SECTION);

        return Promise.all(
            sections.map(section => fetchJSON(`json/${UI_SECTION[section]}`))
        ).then(configs => Promise.all(configs.map((config, index) =>
            config.json().then(configData => JSON_DATA[UI_SECTION[sections[index]]] = configData
                ))))
    });

