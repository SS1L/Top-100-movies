module.exports = class UserDto {
  /** @type {string} */
  email;
  /** @type {string} */
  id;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
  };
};
