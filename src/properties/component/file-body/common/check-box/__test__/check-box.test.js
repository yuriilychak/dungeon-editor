import { createMount } from "@material-ui/core/test-utils";
import React from "react";

import { CheckBox } from "../check-box";

jest.mock("@material-ui/core/Checkbox", () => ({ onChange }) => (
    <button
        onClick={() => onChange({ target: { checked: true } })}
    >
        Mock Csheckbox
    </button>
));

describe("GIVEN Checkbox from property section", () => {
    const mockChange = jest.fn();
    const wrapper = createMount()(
        <CheckBox
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
        expect(mockChange).toHaveBeenCalledWith(true);
    });
});
