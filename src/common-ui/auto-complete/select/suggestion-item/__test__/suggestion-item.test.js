import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import SuggestionItem from "../suggestion-item";

describe("SuggestionItem test",()=> {
    const defaultProps = {
        isHighlighted: false,
        isSelected: false,
        suggestion: { item: "test" },
        getItemProps: (suggestion) => ({})
    };

    it("Default snapshot", () => {
        const wrapper = createMount()(
            <SuggestionItem
                {...defaultProps}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Highlighted snapshot", () => {
        const wrapper = createMount()(
            <SuggestionItem
                {...defaultProps}
                isHighlighted
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Selected snapshot", () => {
        const wrapper = createMount()(
            <SuggestionItem
                {...defaultProps}
                isSelected
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
