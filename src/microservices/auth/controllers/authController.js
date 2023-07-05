import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_KEY } from "../utils/constants";
const User = require("../models/user");

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Campos vacios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Correo ya está registrado" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Campos vacios" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }
    const params = { userId: user._id, name: user.name, email: user.email };
    const token = sign(params, JWT_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({ username: user.name, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
