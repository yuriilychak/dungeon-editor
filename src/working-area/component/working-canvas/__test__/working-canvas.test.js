import React from "react";

import {createMount} from "@material-ui/core/test-utils";

import WorkingCanvas from "../working-canvas";

describe("working-canvas test",()=> {
    it ( "working-canvas snapshot", () => {
        const wrapper = createMount()(
            <WorkingCanvas onGetCanvasRef={jest.fn()} />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
