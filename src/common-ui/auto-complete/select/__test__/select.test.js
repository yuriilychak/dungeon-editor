import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import Select from "../select";

jest.mock("@material-ui/core/MenuItem", () => props => (<div {...props} />));

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

    const wrapper = createMount()(
        <Select {...defaultProps} />
    );


    it("Default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot closed", () => {
        wrapper.setProps({
            ...defaultProps,
            isOpen: false
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot without show empty", () => {
        wrapper.setProps({
            ...defaultProps,
            showEmpty: false
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot with empty input", () => {
        wrapper.setProps({
            ...defaultProps,
            inputValue: ""
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Snapshot with empty input and without show empty", () => {
        wrapper.setProps({
            ...defaultProps,
            inputValue: "",
            showEmpty: false
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
