test('alwaysTrue function returns true', () => {
  expect(alwaysTrue()).toBe(true);
});

test('alwaysFalse function returns false', () => {
  expect(alwaysFalse()).toBe(false);
});

function alwaysTrue() {
  return true;
}

function alwaysFalse() {
  return false;
}
