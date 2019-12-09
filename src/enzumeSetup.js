import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import locale from "../public/static/locale/eng";
import React from "react"

React.useLayoutEffect = React.useEffect;

i18n.use(initReactI18next).init(locale);

configure({ adapter: new Adapter() });
