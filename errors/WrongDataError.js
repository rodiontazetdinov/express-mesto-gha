class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongDataError';
  }
}

module.exports = UserNotFoundError;
