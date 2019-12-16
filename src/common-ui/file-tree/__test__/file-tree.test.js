import React from "react";

import {createShallow} from "@material-ui/core/test-utils";

import {FileTree} from "../file-tree";

jest.mock("react-sortable-tree", () => () => (
    <div/>
));

describe("FileTree test", () => {
    const treeData = [
        {title: '.gitignore'},
        {title: 'package.json'},
        {
            title: 'src',
            isDirectory: true,
            expanded: true,
            children: [
                {title: 'styles.css'},
                {title: 'index.js'},
                {title: 'reducers.js'},
                {title: 'actions.js'},
                {title: 'utils.js'},
            ],
        },
        {
            title: 'tmp',
            isDirectory: true,
            children: [
                {title: '12214124-log'},
                {title: 'drag-disabled-file', dragDisabled: true},
            ],
        },
        {
            title: 'build',
            isDirectory: true,
            children: [{title: 'react-sortable-tree.js'}],
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

    it('default snapshot', () =>
        expect(createShallow()(
            <FileTree
                treeData={treeData}
                generateNodeProps={jest.fn()}
                onChange={jest.fn()}
            />
        ).html()).toMatchSnapshot()
    );
});
