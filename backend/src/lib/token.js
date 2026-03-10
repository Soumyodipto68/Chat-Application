import jwt from 'jsonwebtoken';

export const generateToken = (user,res) => {
  const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict', // Prevent CSRF attacks
  });
}