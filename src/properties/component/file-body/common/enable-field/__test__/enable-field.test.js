import { createMount } from "@material-ui/core/test-utils";
import React from "react";

import { EnableField } from "../enable-field";

jest.mock("../../../../../../common-ui", () => ({
    ToolButton: ({ onClick }) => (
        <button
            onClick={onClick}
        >
        Mock Colorpicker
        </button>
    )
}));

describe("GIVEN EnableField from property section", () => {
    const mockChange = jest.fn();
    const wrapper = createMount()(
        <EnableField
            id="test"
            value={true}
            label="test"
            onChange={mockChange}
        />
    );

    it("WHEN render component with default props THEN component should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("WHEN dispatch onChange THAN result should equal expected object", () => {
        wrapper.find("button").simulate("click");
        expect(mockChange).toHaveBeenCalledWith(false);
    });
});
