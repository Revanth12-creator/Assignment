const User = require("../model/user_model");

//create user
const CREATE_USER = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let userData = {
      name: name,
      email: email,
      password: password,
    };
    const create = await User.create(userData);
    return res.status(200).send(create);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//findAll user
const GET_ALL__USER = async (req, res) => {
  try {
    const data = await User.findAll({});
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//findOne user
const FIND_ONE_USER = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ where: { id: id } });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

//Update user
const UPDATE_USER = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let userData = {
      name: name,
      email: email,
      password: password,
    };
    const id = req.params.id;
    await User.update(userData, { where: { id: id } });
    return res.status(200).json({ message: "User Updated" });
  } catch (e) {
    return res.status(400).json(e);
  }
};
//Delete user
const DELETE_USER = async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    return res.status(200).json({ message: "User Deleted" });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports = {
  CREATE_USER,
  GET_ALL__USER,
  FIND_ONE_USER,
  UPDATE_USER,
  DELETE_USER,
};
