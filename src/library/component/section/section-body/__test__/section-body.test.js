import React from "react";
import { createMount } from "@material-ui/core/test-utils";

import SectionBody from "../section-body";

jest.mock("../../../../../common-ui/file-tree/file-tree");

describe("SectionBody test",() => {
    const defaultProps = {
        id: 0,
        icon: "test",
        emptyText: "test",
        renameText: "test",
        deleteText: "test",
        addDirectoryText: "test",
        onAddDirectory: jest.fn(),
        onRemoveFile: jest.fn(),
        onRenameFile: jest.fn(),
        onSelectFile: jest.fn(),
        onUpdateTree: jest.fn(),
        onOpenFile: jest.fn()
    };

    it("default snapshot", () => {
        const files = [
            { title: '.gitignore' },
            { title: 'package.json' },
            {
                title: 'src',
                isDirectory: true,
                expanded: true,
                children: [
                    { title: 'styles.css' },
                    { title: 'index.js' },
                    { title: 'reducers.js' },
                    { title: 'actions.js' },
                    { title: 'utils.js' },
                ],
            },
            {
                title: 'tmp',
                isDirectory: true,
                children: [
                    { title: '12214124-log' },
                    { title: 'drag-disabled-file', dragDisabled: true },
                ],
            },
            {
                title: 'build',
                isDirectory: true,
                children: [{ title: 'react-sortable-tree.js', preview: 'test' }],
            },
            {
                title: 'public',
                isDirectory: true,
            },
            {
                title: 'node_modules',
                isDirectory: true,
            },
        ];

        const wrapper = createMount()(
            <SectionBody
                {...defaultProps}
                files={files}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("snapshot with empty fields", () => {
        const wrapper = createMount()(
            <SectionBody
                {...defaultProps}
                files={[]}
            />
        );

        expect(wrapper.html()).toMatchSnapshot();
    });
});
