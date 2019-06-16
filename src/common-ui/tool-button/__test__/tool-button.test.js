import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import ToolButton from "../tool-button";

describe("ToolButton test with icon",()=> {

    const Icon = () => <div>Icon</div>;
    const onClick = jest.fn();
    const owner = "test";

    it("default snapshot", () => {
        const wrapper = createMount()(
            <ToolButton
            Icon={Icon}
            owner={owner}
            onClick={onClick}
        />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("with tooltip snapshot", () => {
        const wrapper = createMount()(
            <ToolButton
                Icon={Icon}
                owner={owner}
                onClick={onClick}
                title="title"
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("test click", () => {
        const wrapper = createMount()(
            <ToolButton
                Icon={Icon}
                owner={owner}
                onClick={onClick}
            />
        );

        wrapper.find("button").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });
});


