import jwt from 'jsonwebtoken';

const EXPIRING_DAYS = 7;

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${EXPIRING_DAYS}d`,
  });

  res.cookie('accessToken', token, {
    maxAge: EXPIRING_DAYS * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};

export default generateTokenAndSetCookie;
