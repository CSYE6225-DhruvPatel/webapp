test('alwaysTrue function returns true', () => {
  expect(alwaysTrue()).toBe(true);
});

test('alwaysFalse function returns false', () => {
  expect(alwaysFalse()).toBe(false);
});

function alwaysTrue() {
  return false;
}

function alwaysFalse() {
  return false;
}
