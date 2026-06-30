import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

const AVATAR_BASE_URL = 'https://avatar.iran.liara.run/public';

// 성별에 따라 기본 프로필 이미지 URL을 만드는 순수 함수
const buildProfilePic = (gender, username) => {
  const variant = gender === 'male' ? 'boy' : 'girl';
  return `${AVATAR_BASE_URL}/${variant}?username=${username}`;
};

// 클라이언트에 노출할 사용자 정보만 추리는 순수 함수
const toPublicUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  username: user.username,
  profilePic: user.profilePic,
});

export const signUpUser = asyncHandler(async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ result: false, message: "Passwords don't match" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res
      .status(400)
      .json({ result: false, message: 'Username already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: buildProfilePic(gender, username),
  });

  generateTokenAndSetCookie(newUser._id, res);
  await newUser.save();

  res.status(201).json({ result: true, data: toPublicUser(newUser) });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || '' // user가 존재하지 않을 수 있으므로 옵셔널 체이닝 사용
  );

  if (!user || !isPasswordCorrect) {
    return res
      .status(400)
      .json({ result: false, message: 'Invalid username or password' });
  }

  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({ result: true, data: toPublicUser(user) });
});

export const logoutUser = asyncHandler((req, res) => {
  res.cookie('accessToken', '', { maxAge: 0 });
  res.status(200).json({ result: true, message: 'Logged out successfully' });
});
