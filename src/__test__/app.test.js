import { createShallow, createMount } from "@material-ui/core/test-utils";
import React from "react";

import App from "../app";

jest.mock("../loader", () => ({
    loadStatic: jest.fn(callback => callback())
}));

jest.mock("react-redux", () => ({
    Provider: props => (<div {...props} />)
}));

jest.mock("../store", () => () => ({ getState: jest.fn() }));

jest.mock("../bottom-menu", () => ({
    BottomMenu: () => <span>BottomMenu</span>
}));

jest.mock("../top-menu", () => ({
    TopMenu: () => <span>TopMenu</span>
}));

jest.mock("../library", () => ({
    Library: () => <span>Library</span>
}));

jest.mock("../properties", () => ({
    Properties: () => <span>Properties</span>
}));

jest.mock("../new-project-dialog", () => ({
    NewProjectDialog: () => <span>NewProjectDialog</span>
}));

jest.mock("../new-file-dialog", () => ({
    NewFileDialog: () => <span>NewFileDialog</span>
}));

jest.mock("../export-project-dialog", () => ({
    ExportProjectDialog: () => <span>ExportProjectDialog</span>
}));

jest.mock("../rename-file-dialog", () => ({
    RenameFileDialog: () => <span>RenameFileDialog</span>
}));

jest.mock("../working-area", () => ({
    WorkingArea: () => <span>WorkingArea</span>
}));

describe("GIVEN App component", () => {
    it("WHEN render App with empty store THEN rendered result should match snapshot", () => {
        jest.spyOn(React, "useState").mockImplementation(() => [null, jest.fn()]);
        jest.spyOn(React, "useEffect").mockImplementation(callback => callback());
        const wrapper = createShallow()(<App/>);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("WHEN render App with non empty store THEN rendered result should match snapshot", () => {
        jest.spyOn(React, "useState").mockImplementation(() => [{ getState: jest.fn() }, jest.fn()]);
        jest.spyOn(React, "useEffect").mockImplementation(callback => callback());
        const wrapper = createMount()(<App/>);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
