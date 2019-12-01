import React from "react";

import { createShallow } from "@material-ui/core/test-utils";

import {initialState} from "../../reducer";
import WorkingArea from "../working-area";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import locale from "../../../../public/static/locale/eng";

describe("working-area test", () => {

    beforeAll( () => {

        i18n.use(initReactI18next).init(locale);
    });

    it ( 'working-area default snapshot', () => {
        const wrapper = createShallow()(
            <WorkingArea
                {...initialState}
                onGetCanvasRef={jest.fn()}
                onCloseTab={jest.fn()}
                onSelectTab={jest.fn()}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( 'working-area snapshot with tabs', () => {
        const wrapper = createShallow()(
            <WorkingArea
                {...initialState}
                onGetCanvasRef={jest.fn()}
                onCloseTab={jest.fn()}
                onSelectTab={jest.fn()}
                tabs={[
                    {
                        title: "tab_1",
                        sectionId: 0,
                        fileId: 0
                    },
                    {
                        title: "tab_2",
                        sectionId: 1,
                        fileId: 1
                    }
                ]}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
