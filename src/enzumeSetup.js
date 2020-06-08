import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import locale from "../public/static/locale/eng";
import React from "react";
import "babel-polyfill";

React.useLayoutEffect = React.useEffect;

i18n.use(initReactI18next).init(locale);

jest.mock("@material-ui/core/ButtonBase", () => ({ children, onClick }) => (
    <button
        onClick={onClick}
    >
        {children}
    </button>
));

jest.mock("@material-ui/core/Tooltip", () => ({ children }) => (
    <div>
        <span>Tooltip mock</span>
        <div>
            {children}
        </div>
    </div>
));

configure({ adapter: new Adapter() });
