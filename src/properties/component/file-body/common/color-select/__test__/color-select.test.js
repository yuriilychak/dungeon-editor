import { createMount } from "@material-ui/core/test-utils";
import React from "react";

import { ColorSelect } from "../color-select";

jest.mock("rc-color-picker", () => ({ onChange }) => (
    <button
        onClick={() => onChange({ color: "test color 2" })}
    >
        Mock Colorpicker
    </button>
));

describe("GIVEN ColorSelect from property section", () => {
    const mockChange = jest.fn();
    const wrapper = createMount()(
        <ColorSelect
            id="test"
            value="test color 1"
            label="test"
            onChange={mockChange}
        />
    );

    it("WHEN render component with default props THEN component should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("WHEN dispatch onChange THAN result should equal expected object", () => {
        wrapper.find("button").simulate("click");
        expect(mockChange).toHaveBeenCalledWith("test color 2");
    });
});
