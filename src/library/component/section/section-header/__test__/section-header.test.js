import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import SectionHeader from "../section-header";

describe("SectionHeader test",() => {
    const onAddDirectory = jest.fn();
    const onAddFile = jest.fn();
    const wrapper = createMount()(
        <SectionHeader
            id={5}
            icon="test"
            titleText="test"
            addElementText="test"
            addDirectoryText="test"
            onAddFile={onAddFile}
            onAddDirectory={onAddDirectory}
        />
    );

    it("default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Add file", () => {
        wrapper.find("button").at(0).simulate("click");
        expect(onAddFile).toHaveBeenCalled();
    });

    it("Add directory", () => {
        wrapper.find("button").at(1).simulate("click");
        expect(onAddDirectory).toHaveBeenCalled();
    });
});
