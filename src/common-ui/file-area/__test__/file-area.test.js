import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import { FileArea } from "../file-area";
import { EMPTY_VALUE } from "../constants";

jest.mock("react-sortable-tree", () => ({
    onChange,
    canDrag,
    canDrop,
    generateNodeProps
}) => (
    <button
        id="SortableTree"
        onClick={() => onChange([{
            id: 2,
            title: "testId2"
        }])}
    >
        {`Sortable tree mock drag:${
            canDrag()} drop:${
            canDrop({ node: { isDirectory: false } })} nodeProps:${
            generateNodeProps("{ testProps }")
        }`}
    </button>
));

describe("GIVEN file-area", () => {
    const value = {
        id: 1,
        title: "testTitle1"
    };

    const onChange = jest.fn();
    const dropId = "testDropId";

    const wrapper = createMount()(
        <FileArea
            value={value}
            onChange={onChange}
            dropId={dropId}
        />
    );

    it("WHEN render component WITH default props THEN result should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("WHEN handle click on close element THEN onChange should call with empty object", () => {
        const element = wrapper.find("span").at(1);
        element.simulate("click");
        expect(onChange).toHaveBeenCalledWith(EMPTY_VALUE);
    });

    it("WHEN handle change THEN onChange should call with expected object", () => {
        const element = wrapper.find("button").at(0);
        element.simulate("click");
        expect(onChange).toHaveBeenCalledWith({
            id: 2,
            title: "testId2"
        });
    });
});