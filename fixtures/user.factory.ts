export interface TestUser {
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function createUniqueUser(): TestUser {
  const timestamp = Date.now();

  return {
    gender: 'male',
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: `test.user.${timestamp}@commerce.com`,
    password: 'P@ssword100%'
  };
}
