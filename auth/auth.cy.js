// cypress/integration/auth/auth.spec.js

import { registerUser, loginUser } from '../utils/api-helpers';

describe('Authentication API Tests', () => {
  it('POST - Register Successful', () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    registerUser(userData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Register Unsuccessful', () => {
    const userData = {
      email: 'sydney@fife'
    };

    registerUser(userData).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST - Login Successful', () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    loginUser(userData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Login Unsuccessful', () => {
    const userData = {
      email: 'peter@klaven'
    };

    loginUser(userData).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });
});