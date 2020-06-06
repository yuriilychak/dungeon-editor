import React from "react";
import 'babel-polyfill';

import { createShallow } from '@material-ui/core/test-utils';

import reducer from '../../reducer';
import Library from "../library";
import { getInitialState } from "../../../../test_templates";
import { UI_SECTION } from "../../../enum";

jest.mock("../../../common-ui/file-tree/file-tree");

jest.mock("react-sortable-tree", () => () => (
    <div/>
));

describe('Library test',() => {
    const initialState = getInitialState(reducer, UI_SECTION.LIBRARY);

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
        const wrapper = createShallow()(
            <Library
                {...defaultProps}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
