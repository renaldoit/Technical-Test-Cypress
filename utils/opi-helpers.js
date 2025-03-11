// cypress/integration/utils/api-helpers.js

export const getUsers = (page = 1) => {
    return cy.request('GET', `https://reqres.in/api/users?page=${page}`);
  };
  
  export const createUser = (userData) => {
    return cy.request('POST', 'https://reqres.in/api/users', userData);
  };
  
  export const updateUser = (userId, userData) => {
    return cy.request('PUT', `https://reqres.in/api/users/${userId}`, userData);
  };
  
  export const deleteUser = (userId) => {
    return cy.request('DELETE', `https://reqres.in/api/users/${userId}`);
  };
  
  export const getPosts = () => {
    return cy.request('GET', 'https://jsonplaceholder.typicode.com/posts');
  };
  
  export const createPost = (postData) => {
    return cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', postData);
  };
  
  export const updatePost = (postId, postData) => {
    return cy.request('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`, postData);
  };
  
  export const deletePost = (postId) => {
    return cy.request('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
  };
  
  export const registerUser = (userData) => {
    return cy.request('POST', 'https://reqres.in/api/register', userData);
  };
  
  export const loginUser = (userData) => {
    return cy.request('POST', 'https://reqres.in/api/login', userData);
  };
  
  export const validateUserSchema = (user) => {
    expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
  };
  
  export const validatePostSchema = (post) => {
    expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
  };