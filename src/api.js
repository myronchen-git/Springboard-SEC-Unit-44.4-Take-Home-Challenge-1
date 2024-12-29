import axios from 'axios';

// ==================================================

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// --------------------------------------------------

/**
 * This is used to contact the backend API.
 */
class BackendApi {
  /**
   * Handles logging the error if an API call failed.
   *
   * @param {Function} func - The function that will call the backend.
   * @returns {Object} The response's data Object.
   */
  static errorHandlingWrapper(func) {
    try {
      return func();
    } catch (err) {
      if (err.response) {
        console.error(
          'The request was made and the server responded with a status ' +
            'code that falls out of the range of 2xx.'
        );
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);
      } else if (err.request) {
        console.error('The request was made but no response was received.');
        console.error(err.request);
      } else {
        console.error(
          'Something happened in setting up the request that triggered an Error.'
        );
        console.error('Error', err.message);
      }
      console.error(err.config);

      throw err;
    }
  }

  /**
   * Makes a POST request to the /users endpoint to sign up / create a new user.
   *
   * @param {Object} formData - Contains the required properties for creating a
   *  new user.
   * @returns {Object} The user Object containing the data of the new user.
   */
  static async postUser(formData) {
    console.debug('API call: POST /users, ', JSON.stringify(formData));

    return await this.errorHandlingWrapper(
      async () => (await axios.post(`${BASE_URL}/users`, formData)).data
    );
  }

  /**
   * Gets all users by making a GET request to /users.
   *
   * @returns {Array} A list of user Objects.
   */
  static async getUsers() {
    console.debug('API call: GET /users');

    return await this.errorHandlingWrapper(
      async () => (await axios.get(`${BASE_URL}/users`)).data
    );
  }
}

// ==================================================

export default BackendApi;
