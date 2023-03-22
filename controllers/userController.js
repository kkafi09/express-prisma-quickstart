const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwtAuth = require("../middlewares/jwtAuth");
const wrapper = require("../helpers/utils/wrapper");
require("dotenv").config();

const prisma = new PrismaClient();

/**
 * Controller for login user
 * @param {username, password} req.body
 * @returns
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return wrapper.response(
        res,
        "fail",
        null,
        "Invalid email and password",
        404
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return wrapper.response(res, "fail", null, "Invalid credentials", 400);
    }

    const token = jwtAuth.generateToken(user.id);

    const result = {
      data: {
        user,
        token,
      },
    };

    return wrapper.response(res, "success", result, "Success Login");
  } catch (error) {
    return wrapper.response(res, "fail", error, "Error Login", 500);
  }
};

/**
 *  Controller for register user
 * @param {name, username, password, role} req.body
 * @returns
 */
exports.register = async (req, res) => {
  const { name, username, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role,
      },
    });

    const token = jwtAuth.generateToken(user.id);

    const result = {
      data: {
        user,
        token,
      },
    };

    return wrapper.response(res, "success", result, "Success register", 201);
  } catch (error) {
    return wrapper.response(res, "fail", error, "Error register", 500);
  }
};

/**
 * Controller for get detail User from jwt middleware
 * @param {userId} req
 * @param {*} res
 */
exports.getUser = async (req, res) => {
  const { userId } = req.user;

  await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      const result = {
        data: {
          user,
        },
      };

      return wrapper.response(res, "success", result, "Success get user auth");
    });
};
