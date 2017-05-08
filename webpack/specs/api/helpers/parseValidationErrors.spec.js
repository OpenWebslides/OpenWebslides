import parseValidationErrors from 'api/helpers/parseValidationErrors';

describe('parseValidationErrors function', () => {
  it('parses validation error array', () => {
    const fakeErrorArray = [
      {
        title: 'has already been taken',
        detail: 'email - has already been taken',
      },
      {
        title: 'cannot be blank',
        detail: 'password - cannot be blank',
      },
    ];

    const parsedErrors = parseValidationErrors(fakeErrorArray);

    expect(parsedErrors).toEqual({
      email: 'Email has already been taken',
      password: 'Password cannot be blank',
    });
  });
});
