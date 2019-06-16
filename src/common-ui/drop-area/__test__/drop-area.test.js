import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import DropArea from "../drop-area";

describe("DropArea test",()=> {

    const dropMessage = "Test";
    const onDropFiles = jest.fn();

    it("default snapshot", () => {
        const wrapper = createMount()(
            <DropArea
                dropMessage={dropMessage}
                onDropFiles={onDropFiles}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("with children snapshot", () => {
        const wrapper = createMount()(
            <DropArea
                dropMessage={dropMessage}
                onDropFiles={onDropFiles}
            >
                Children
            </DropArea>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
