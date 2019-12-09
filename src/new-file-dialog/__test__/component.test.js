import NewFileDialog from "../component/new-file-dialog";
import { initialState } from '../reducer';
import React from "react";
import { createMount } from '@material-ui/core/test-utils';

describe('new-file-dialog index test',()=>{
    const props = {
        ...initialState,
        isPopupOpen: true,
        sectionId: 1,
        onClosePopup: jest.fn(),
        onSubmitPopup: jest.fn()
    };

    const wrapper = createMount()(
        <NewFileDialog
            {...props}
        />
    );

    const projectInput = wrapper.find('input');

    it('Open snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Close snapshot', () => {
        const wrapper = createMount()(
            <NewFileDialog
                {...initialState}
                isPopupOpen={false}
                onClosePopup={ jest.fn() }
                onSubmitProject={ jest.fn() }
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Click submit with empty project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitPopup");

        const button = wrapper.find('#new-file-submit').first();

        projectInput.simulate('change', { target: { value: '' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitPopup).not.toHaveBeenCalled();
    });

    it('Click submit with "test" project name', () => {
        jest.spyOn(wrapper.props(), "onSubmitPopup");

        const button = wrapper.find('#new-file-submit').first();

        projectInput.simulate('change', { target: { value: 'test' } });
        button.simulate('click');
        expect(wrapper.props().onSubmitPopup).toHaveBeenCalled();
    });

    it('Click cancel', () => {
        jest.spyOn(wrapper.props(), "onClosePopup");

        const button = wrapper.find('#new-file-reject').first();
        button.simulate('click');
        expect(wrapper.props().onClosePopup).toHaveBeenCalled();
    });

});
