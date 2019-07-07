import React from "react";

import Close from "@material-ui/icons/Close";
import {createMount} from "@material-ui/core/test-utils";

import TabContent from "../tab-content";

describe("tab-content test",()=> {
    const onClose = jest.fn();
    const wrapper = createMount()(
        <TabContent
            title="test"
            icon="test"
            onClose={onClose}
        />
    );

    it ( "tab-content snapshot", () => expect(wrapper.html()).toMatchSnapshot());

    it ( "tab-content dispatch close", () => {
        const closeButton = wrapper.find(Close);

        closeButton.simulate("click");
        expect(onClose).toHaveBeenCalled();
    });
});
