import React from "react";
import ActionDialog from "../action-dialog";
import { createMount } from '@material-ui/core/test-utils';

describe('ActionDialog test',()=>{

    const title = "Test";
    const description = "Test";
    const dialogId = "test";
    const onSubmit = jest.fn();
    const onReject = jest.fn();

    const wrapper = createMount()(
        <ActionDialog
            open={true}
            title={title}
            description={description}
            dialogId={dialogId}
            onSubmit={onSubmit}
            onReject={onReject}
            submitTitle={title}
            rejectTitle={title}
        />
    );

    it('Open snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Close snapshot', () => {
        const wrapper = createMount()(
            <ActionDialog
                open={true}
                title={title}
                description={description}
                dialogId={dialogId}
                onSubmit={onSubmit}
                onReject={onReject}
                submitTitle={title}
                rejectTitle={title}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Click submit', () => {
        const button = wrapper.find('#test-submit').first();
        button.simulate('click');
        expect(onSubmit).toHaveBeenCalled();
    });

    it('Click reject', () => {
        const button = wrapper.find('#test-reject').first();
        button.simulate('click');
        expect(onReject).toHaveBeenCalled();
    });
});
