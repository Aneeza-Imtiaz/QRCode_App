import { pickImage } from '../controls/ScannerHandler';

it('Check Image picked from gallery', () => {
  expect(pickImage(2)).toBeDefined();
});