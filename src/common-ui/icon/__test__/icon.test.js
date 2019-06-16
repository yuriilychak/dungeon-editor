import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import Icon from "../icon";

describe("Icon test",()=> {

    it('default snapshot', () => {
        const wrapper = createMount()(
            <Icon name="test" />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
