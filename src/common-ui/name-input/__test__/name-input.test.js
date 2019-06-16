import React from "react";
import {createMount} from "@material-ui/core/test-utils";

import NameInput from "../name-input";

describe( "NameInput test", () => {

    const props = {
        isError: false,
        titleLocale: "test locale",
        errorLocale: "test error",
        maxLength: 20
    };

    const wrapper = createMount()(
        <NameInput
            {...props}
        />
    );
    const instance = wrapper.instance();

    it("Default snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Error snapshot", () => {
        const errorProps = {...props, isError: true};
        const errorWrapper = createMount()(
            <NameInput
                {...errorProps}
            />
        );

        expect(errorWrapper.html()).toMatchSnapshot();
    });

    it("Test input value: not empty", () => {
        instance.onProjectNameChange({
            target: {
                value: "test_text difference"
            }
        });

        expect(instance.state.projectName).toBe("test_text");
    });

    it("Test input value: empty", () => {
        instance.onProjectNameChange({
            target: {
                value: " "
            }
        });

        expect(instance.state.projectName).toBe("");
    });
});
