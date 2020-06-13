import React from "react";
import { createShallow } from "@material-ui/core/test-utils";

import SuggestionItem from "../suggestion-item";

jest.mock("@material-ui/core/MenuItem", () => props => (<div {...props} />));

describe("SuggestionItem test",()=> {
    const defaultProps = {
        isHighlighted: false,
        isSelected: false,
        suggestion: { item: "test" },
        getItemProps: () => ({})
    };

    it("Default snapshot", () => {
        const wrapper = createShallow()(
            <SuggestionItem
                {...defaultProps}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
