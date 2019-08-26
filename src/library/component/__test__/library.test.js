import React from "react";
import { createMount } from '@material-ui/core/test-utils';

import "../../../locale";

import { initialState } from '../../reducer';
import Library from "../library";

describe('Library test',() => {
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

    const wrapper = createMount()(
        <Library
            {...defaultProps}
        />
    );

    it("default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});
