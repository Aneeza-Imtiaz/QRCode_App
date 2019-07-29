import React from 'react';
import HomeComponent from '../components/HomeComponent';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const wrapper = shallow(<HomeComponent/>);
const instance = wrapper.instance();

it('Check permissions', () => {
  expect(instance._checkPermissions(1)).toBeTruthy();
  expect(instance._checkPermissions(2)).toBeTruthy();
});

it('Check Image picked from gallery', () => {
  expect(instance._takePhoto(2)).toBeTruthy();
});

it('Check Base64 convert to Unit8ClampedArray', () => {
  expect(instance._convertDataURIToBinary()).toBeDefined();
});


