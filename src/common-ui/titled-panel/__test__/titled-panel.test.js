import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import TitledPanel from "../titled-panel";

describe("TitledPanel test",()=> {
    it('default snapshot', () => {
        const wrapper = createMount()(
            <TitledPanel
                title="test"
            >
                Test text
            </TitledPanel>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('with title children snapshot', () => {
        const wrapper = createMount()(
            <TitledPanel
                title="test"
                titleChildren="Title children"
            >
                Test text
            </TitledPanel>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
