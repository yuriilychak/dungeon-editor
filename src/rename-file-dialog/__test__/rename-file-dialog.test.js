import { RenameFileDialog } from "../component";
import { initialState } from '../reducer';
import React from "react";
import { createMount } from '@material-ui/core/test-utils';
import "../../locale";

describe('rename-file-dialog index test',() => {
    const props = {
        ...initialState,
        isPopupOpen: true,
        onClosePopup: jest.fn(),
        onSubmitRename: jest.fn()
    };

    const wrapper = createMount()(
        <RenameFileDialog
            {...props}
        />
    );

    const projectInput = wrapper.find('input');

    it('Open snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Close snapshot', () => {
        const wrapper = createMount()(
            <RenameFileDialog
                {...initialState}
                isPopupOpen={false}
                onClosePopup={ jest.fn() }
                onSubmitRename={ jest.fn() }
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Click submit with empty project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitRename");

        const button = wrapper.find('#rename-file-dialog-submit').first();

        projectInput.simulate('change', { target: { value: '' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitRename).not.toHaveBeenCalled();
    });

    it('Click submit with "test" project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitRename");

        const button = wrapper.find('#rename-file-dialog-submit').first();

        projectInput.simulate('change', { target: { value: 'test' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitRename).toHaveBeenCalled();
    });

    it('Click cancel', () => {
        jest.spyOn(wrapper.props(), "onClosePopup");

        const button = wrapper.find('#rename-file-dialog-reject').first();
        button.simulate('click');
        expect(wrapper.props().onClosePopup).toHaveBeenCalled();
    });
});
