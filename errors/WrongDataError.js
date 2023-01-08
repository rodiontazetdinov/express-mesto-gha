/* eslint-disable linebreak-style */
class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongDataError';
  }
}

module.exports = WrongDataError;
