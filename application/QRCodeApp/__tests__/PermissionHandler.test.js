import { checkPermission } from '../controls/PermissionHandler';

it('Check permissions', () => {
  expect(checkPermission(1)).toBeTruthy();
  expect(checkPermission(2)).toBeTruthy();
});