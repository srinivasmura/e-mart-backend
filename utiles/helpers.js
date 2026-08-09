const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../models/users.json");

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersFile));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

module.exports = {
  getUsers,
  saveUsers
};