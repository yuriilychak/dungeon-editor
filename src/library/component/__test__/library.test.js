import React from "react";
import 'babel-polyfill';

import { createMount } from '@material-ui/core/test-utils';

import { initialState } from '../../reducer';
import Library from "../library";

jest.mock("../../../common-ui/file-tree/file-tree");

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
        onUpdateTree: jest.fn(),
        onOpenFile: jest.fn()
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
