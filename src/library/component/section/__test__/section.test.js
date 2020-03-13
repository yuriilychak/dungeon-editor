import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import Section from "../section";

jest.mock("../../../../common-ui/file-tree/file-tree");

describe("Section test", () => {

    it("default snapshot", () => {
        const wrapper = createMount()(
            <Section
                id={0}
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
