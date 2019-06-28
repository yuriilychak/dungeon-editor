import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import Select from "../select";

describe("Select test",()=> {
    const defaultProps = {
        getMenuProps: jest.fn(),
        getItemProps: jest.fn(),
        suggestions: [
            {
                item: "test"
            }
        ],
        inputValue: "test",
        isOpen: true,
        showEmpty: true,
        highlightedIndex: 0
    };

    it("Default snapshot", () => {
        const wrapper = createMount()(
            <Select {...defaultProps} />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot closed", () => {
        const wrapper = createMount()(
            <Select {...defaultProps} isOpen={false}/>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot without show empty", () => {
        const wrapper = createMount()(
            <Select {...defaultProps} showEmpty={false}/>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot with empty input", () => {
        const wrapper = createMount()(
            <Select {...defaultProps} inputValue={""}/>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot with empty input and without show empty", () => {
        const wrapper = createMount()(
            <Select {...defaultProps} inputValue={""} showEmpty={false}/>
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
