import React from "react";
import {createMount} from "@material-ui/core/test-utils";

import AutoComplete from "../auto-complete";

describe("AutoComplete test", () => {
    it("Default snapshot", () => {
        const wrapper = createMount()(
            <AutoComplete
                label="test"
                placeholder="test"
                showEmpty
                suggestions={[{
                    item: "test"
                }]}
                defaultItem="test"
                onAddItem={jest.fn()}
                onSelectItem={jest.fn()}
                onClearItem={jest.fn}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
