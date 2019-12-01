import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import { initialState } from '../../reducer';
import ExportPopupDialog from "../export-project-dialog";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import locale from "../../../../public/static/locale/eng";

describe("new-project-dialog index test",()=> {
    const props = {
        ...initialState,
        isPopupOpen: true,
        onClosePopup: jest.fn(),
        onExportProject: jest.fn()
    };

    const wrapper = createMount()(
        <ExportPopupDialog
            {...props}
        />
    );

    beforeAll( () => {
        i18n.use(initReactI18next).init(locale);
    });

    it('Open snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Close snapshot', () => {
        const innerWrapper = createMount()(
            <ExportPopupDialog
                {...initialState}
                isPopupOpen={false}
                onClosePopup={ jest.fn() }
                onExportProject={ jest.fn() }
            />
        );
        expect(innerWrapper.html()).toMatchSnapshot();
    });

    it("Test progress 0", () => {
        wrapper.setProps({
            progressData: {
                progress: 0,
                fileName: null,
                isComplete: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Test progress 20", () => {
        wrapper.setProps({
            progressData: {
                progress: 20,
                fileName: "test.json",
                isComplete: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Test progress 100 not completed", () => {
        wrapper.setProps({
            progressData: {
                progress: 100,
                fileName: null,
                isComplete: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Test progress 100 completed", () => {
        wrapper.setProps({
            progressData: {
                progress: 100,
                fileName: null,
                isComplete: true
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });
});
