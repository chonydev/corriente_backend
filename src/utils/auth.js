//require('dotenv').config();

//import {config} from 'dotenv'
import dotenv from 'dotenv';
dotenv.config(); 

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'


const JWT_SECRET = process.env.JWT_SECRET
/*
console.log(process.env.JWT_SECRET)
*/

async function hashPassword(password) {
  const saltRounds = 10; // Adjust salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

const generateToken = (data) => jwt.sign({...data}, JWT_SECRET, { expiresIn: '12h' });

const verifyToken =  (token) => jwt.verify(token, JWT_SECRET)
  /*
  ,   (err, user) => {
  if (err) return error
  return user
});
*/
export {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
}