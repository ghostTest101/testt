const User = require('../models/User');
class UserService {
  async createUser(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, user) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;