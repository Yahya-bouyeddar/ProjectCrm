import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {

      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid){
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  

  // Vérifier si l'utilisateur existe déjà
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer un nouveau utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Générer un JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Répondre avec un message de succès et le token
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};
