import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import TitledField from "../titled-field";

describe("TitledField test",()=> {
    it('default snapshot', () => {
        const wrapper = createMount()(
            <TitledField
                title="test"
                titleWidth={100}
            >
                Test
            </TitledField>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
