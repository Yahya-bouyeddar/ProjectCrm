import bcrypt from 'bcryptjs';

const password = "123456"; // mot de passe à hasher
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

console.log("Mot de passe hashé :", hashedPassword);
