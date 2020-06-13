import React from "react";
import { createShallow } from "@material-ui/core/test-utils";

import Section from "../section";

jest.mock("../../../../common-ui/file-tree/file-tree");

jest.mock("react-sortable-tree", () => () => (
    <div/>
));

describe("Section test", () => {
    it("default snapshot", () => {
        const wrapper = createShallow()(
            <Section
                id={0}
                dropId="test"
                icon="test"
                files={[]}
                addDirectoryText="test"
                addElementText="test"
                emptyText="test"
                deleteText="test"
                renameText="test"
                titleText="test"
                onAddFile={jest.fn()}
                onAddDirectory={jest.fn()}
                onUpdateTree={jest.fn()}
                onRemoveFile={jest.fn()}
                onRenameFile={jest.fn()}
                onSelectFile={jest.fn()}
                onOpenFile={jest.fn()}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
