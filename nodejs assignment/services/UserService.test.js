const UserService = require("./UserService");
const User = require("../models/User");
const mongoose = require("mongoose");

describe("UserService", () => {
  let userService;
  let mockUser;

  beforeAll(async () => {
    await mongoose.connect('mongodb://0.0.0.0:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
    userService = new UserService();
  });

  beforeEach(async () => {
    mockUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password",
    });
    await mockUser.save();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const newUser = await userService.createUser(mockUser);
    expect(newUser._id).toBeDefined();
    expect(newUser.name).toBe(mockUser.name);
    expect(newUser.email).toBe(mockUser.email);
  });

  it("should get all users", async () => {
    const users = await userService.getAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(users[0].name).toBe(mockUser.name);
  });

  it("should get a user by id", async () => {
    const user = await userService.getUserById(mockUser._id.toString());
    expect(user._id.toString()).toBe(mockUser._id.toString());
    expect(user.name).toBe(mockUser.name);
  });

  it("should update a user", async () => {
    const updatedUser = await userService.updateUser(mockUser._id.toString(), { name: "Updated User" });
    expect(updatedUser._id.toString()).toBe(mockUser._id.toString());
    expect(updatedUser.name).toBe("Updated User");
  });

  it("should delete a user", async () => {
    const deleted = await userService.deleteUser(mockUser._id);
    expect(deleted).toBe(true);
    const user = await User.findById(mockUser._id);
    expect(user).toBeNull();
  });
});
