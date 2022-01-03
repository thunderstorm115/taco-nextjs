import React from 'react';
import ReactDOM from 'react-dom';
import Monitoring from './Monitoring';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() })

// describe('Button', () => {
//     it('should render the button', () => {
//         const wrapper = mount(<Monitoring />).dive();
//         console.log(wrapper.debug())
//         // Note the use of dive() because Composition is now wrapped by the withStyles higher order component.
//         expect(wrapper.find('Button')).toBeDefined();

//     });
// });

let wrapper;

beforeEach(() => {
    wrapper = mount(<Monitoring/>);
});

describe('<div /> rendering', () => {
    it('should render two <div>', () => {
        console.log(wrapper.debug())
        expect(wrapper.find('div')).toHaveLength(2);
    });

  
});

