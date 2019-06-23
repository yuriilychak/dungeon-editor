import React from "react";
import {createMount} from "@material-ui/core/test-utils";

import Section from "../section";

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
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
