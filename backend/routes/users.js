const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); // 유효성 검사
const authMiddleware = require("../middleware/authMiddleware");
// 회원 가입 (유효성 검사 추가)
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("사용자 이름을 입력해주세요."),
    body("email").isEmail().withMessage("유효한 이메일 주소를 입력해주세요."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("비밀번호는 최소 6자 이상이어야 합니다."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const savedUser = await newUser.save();
      res.status(201).json({ message: "회원가입 성공" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 로그인
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // JWT 생성 (유효 시간 추가)
    res.json({ token, username: user.username }); // 토큰과 사용자 이름 전달
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 현재 사용자 정보 조회 (인증 필요)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // 비밀번호 제외
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
