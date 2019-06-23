import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import ImagePreview from "../image-preview";

describe("ImagePreview test",()=> {
    const preview = "test";

    it('default snapshot', () => {
        const wrapper = createMount()(
            <ImagePreview
                preview={preview}
            >
                <div>Test</div>
            </ImagePreview>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('snapshot with fixed width', () => {
        const wrapper = createMount()(
            <ImagePreview
                preview={preview}
                width={200}
            >
                <div>Test</div>
            </ImagePreview>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('snapshot with fixed height', () => {
        const wrapper = createMount()(
            <ImagePreview
                preview={preview}
                height={200}
            >
                <div>Test</div>
            </ImagePreview>
        );
        expect(wrapper.html()).toMatchSnapshot();
    });
});
