import React from "react";

import {createMount} from "@material-ui/core/test-utils";

import WorkingCanvas from "../working-canvas";

describe("working-canvas test",()=> {
    const onCreateElement = jest.fn();

    const wrapper = createMount()(
        <WorkingCanvas
            onGetCanvasRef={jest.fn()}
            onCreateElement={onCreateElement}
        />
    );

    it ( "working-canvas snapshot", () => expect(wrapper.html()).toMatchSnapshot());

    it ( "working-canvas test drop", () => {
        wrapper.find('canvas').simulate(
            'drop',
            {
                preventDefault: jest.fn(),
                clientX: 0,
                clientY: 0,
                dataTransfer: {
                    getData: jest.fn()
                }
            });
        expect(onCreateElement).toHaveBeenCalled();
    });
});
