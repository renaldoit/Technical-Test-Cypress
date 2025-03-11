// cypress/integration/users/users.spec.js

import { getUsers, createUser, updateUser, deleteUser, validateUserSchema } from '../utils/api-helpers';

describe('Users API Tests', () => {
  it('GET - List Users', () => {
    getUsers(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length(6);
      response.body.data.forEach(user => {
        validateUserSchema(user);
      });
    });
  });

  it('GET - Single User', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      expect(response.status).to.eq(200);
      validateUserSchema(response.body.data);
    });
  });

  it('GET - User Not Found', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('POST - Create User', () => {
    const userData = {
      name: 'morpheus',
      job: 'leader'
    };

    createUser(userData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
      expect(response.body.name).to.eq(userData.name);
      expect(response.body.job).to.eq(userData.job);
    });
  });

  it('PUT - Update User', () => {
    const userData = {
      name: 'morpheus',
      job: 'zion resident'
    };

    updateUser(2, userData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(userData.name);
      expect(response.body.job).to.eq(userData.job);
      expect(response.body).to.have.property('updatedAt');
    });
  });

  it('DELETE - Delete User', () => {
    deleteUser(2).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});