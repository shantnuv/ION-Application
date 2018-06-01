const USERS = [
  {
    username: 'user1',
    password: 'user1@123'
  },
  {
    username: 'user2',
    password: 'user2@123'
  }
];

/**
 * Checks whether the user is present for given user name and password.
 * @param {string} userName User name to be checked.
 * @param {string} password Password to be checked.
 * @return {boolean}
 * @private
 */
const isUserPresent_ = (userName, password) => {
  return USERS.some((user) => {
    return user.username == userName && user.password == password;
  })
};

/**
 * Returns the login message checking for the given username and password.
 * @param {string} userName
 * @param {string} password
 * @return {!Object<strign, string>} */
const loginUser = (userName, password) => {
  const message = {
    success: true
  };

  if (!isUserPresent_(userName, password)) {
    message.success = false;
    message['errorMessage'] = 'Login Error';
  }

  return message;
}

module.exports = loginUser;
