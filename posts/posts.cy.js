// cypress/integration/posts/posts.spec.js

import { getPosts, createPost, updatePost, deletePost, validatePostSchema } from '../utils/api-helpers';

describe('Posts API Tests', () => {
  it('GET - List Posts', () => {
    getPosts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      response.body.forEach(post => {
        validatePostSchema(post);
      });
    });
  });

  it('GET - Single Post', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1').then((response) => {
      expect(response.status).to.eq(200);
      validatePostSchema(response.body);
    });
  });

  it('POST - Create Post', () => {
    const postData = {
      userId: 1,
      title: 'foo',
      body: 'bar'
    };

    createPost(postData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.userId).to.eq(postData.userId);
      expect(response.body.title).to.eq(postData.title);
      expect(response.body.body).to.eq(postData.body);
    });
  });

  it('PUT - Update Post', () => {
    const postData = {
      userId: 1,
      title: 'foo',
      body: 'baz'
    };

    updatePost(1, postData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.userId).to.eq(postData.userId);
      expect(response.body.title).to.eq(postData.title);
      expect(response.body.body).to.eq(postData.body);
    });
  });

  it('DELETE - Delete Post', () => {
    deletePost(1).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});