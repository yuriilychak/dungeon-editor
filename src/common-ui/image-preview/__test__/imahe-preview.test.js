import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import ImagePreview from "../image-preview";

describe("ImagePreview test",()=> {
    const preview = "test";

    it('default snapshot', () => {
        expect(createShallow()(
            <ImagePreview
                preview={preview}
            >
                <div>Test</div>
            </ImagePreview>
        ).html()).toMatchSnapshot();
    });

    it('snapshot with fixed width', () => {
        expect(createShallow()(
            <ImagePreview
                preview={preview}
                width={200}
            >
                <div>Test</div>
            </ImagePreview>
        ).html()).toMatchSnapshot();
    });

    it('snapshot with fixed height', () => {
        expect(createShallow()(
            <ImagePreview
                preview={preview}
                height={200}
            >
                <div>Test</div>
            </ImagePreview>
        ).html()).toMatchSnapshot();
    });
});
