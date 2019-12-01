import React from "react";
import 'babel-polyfill';

import { createMount } from '@material-ui/core/test-utils';

import { initialState } from '../../reducer';
import Library from "../library";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import locale from "../../../../public/static/locale/eng";

describe('Library test',() => {
    beforeAll( () => {
        i18n.use(initReactI18next).init(locale);
    });

    const defaultProps = {
        ...initialState,
        files: [[], [], [], [], [], [], []],
        onAddDirectory: jest.fn(),
        onAddFiles: jest.fn(),
        onAddFile: jest.fn(),
        onDropFiles: jest.fn(),
        onRemoveFile: jest.fn(),
        onExportProject: jest.fn(),
        onPublishProject: jest.fn(),
        onRenameFile: jest.fn(),
        onSelectFile: jest.fn(),
        onUpdateTree: jest.fn()
    };

    it("default snapshot", () => {
        const wrapper = createMount()(
            <Library
                {...defaultProps}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
