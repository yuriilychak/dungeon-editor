import React from "react";

import { createShallow } from "@material-ui/core/test-utils";

import reducer from "../../reducer";
import WorkingArea from "../working-area";
import { getInitialState } from "../../../../test_templates";
import { UI_SECTION } from "../../../enum";

jest.mock("../../../working-stage");

describe("working-area test", () => {
    const initialState = getInitialState(reducer, UI_SECTION.WORKING_AREA);

    it ( 'working-area default snapshot', () => {
        const wrapper = createShallow()(
            <WorkingArea
                {...initialState}
                onCreateElement={jest.fn()}
                onGetCanvasRef={jest.fn()}
                onCloseTab={jest.fn()}
                onSelectTab={jest.fn()}
                onTransformReset={jest.fn()}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it ( 'working-area snapshot with tabs', () => {
        const wrapper = createShallow()(
            <WorkingArea
                {...initialState}
                onGetCanvasRef={jest.fn()}
                onCloseTab={jest.fn()}
                onSelectTab={jest.fn()}
                onCreateElement={jest.fn()}
                onTransformReset={jest.fn()}
                tabs={[
                    {
                        title: "tab_1",
                        sectionId: 0,
                        fileId: 0
                    },
                    {
                        title: "tab_2",
                        sectionId: 1,
                        fileId: 1
                    }
                ]}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
