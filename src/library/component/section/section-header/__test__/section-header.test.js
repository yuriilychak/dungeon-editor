import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import SectionHeader from "../section-header";

describe("Icon test",()=> {
    const onAddDirectory = jest.fn();
    const onAddNewFile = jest.fn();
    const wrapper = createMount()(
        <SectionHeader
            id={5}
            icon="test"
            titleText="test"
            addElementText="test"
            addDirectoryText="test"
            onAddNewFile={onAddNewFile}
            onAddDirectory={onAddDirectory}
        />
    );

    it("default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Add file", () => {
        wrapper.find("button").at(0).simulate("click");
        expect(onAddNewFile).toHaveBeenCalled();
    });

    it("Add directory", () => {
        wrapper.find("button").at(1).simulate("click");
        expect(onAddDirectory).toHaveBeenCalled();
    });
});
