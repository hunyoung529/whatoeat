const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

// 중복 이메일 확인 함수
const checkExistingEmail = async (email) => {
  const existingUser = await User.findOne({ email });
  return !!existingUser;
};

// 중복 닉네임 확인 함수
const checkExistingNickname = async (nickname) => {
  const existingUser = await User.findOne({ nickname });
  return !!existingUser;
};

// 회원 가입
router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("이메일을 입력해주세요.")
      .isEmail()
      .withMessage("유효하지 않은 이메일 주소입니다."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("비밀번호는 최소 6자 이상이어야 합니다."),
    body("nickname").notEmpty().withMessage("닉네임을 입력해주세요."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    try {
      if (await checkExistingEmail(req.body.email)) {
        return res
          .status(400)
          .json({ message: "이미 사용 중인 이메일입니다." });
      }

      if (await checkExistingNickname(req.body.nickname)) {
        return res
          .status(400)
          .json({ message: "이미 사용 중인 닉네임입니다." });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const savedUser = await newUser.save();

      res.status(201).json({
        message: "회원가입 성공",
        user: {
          email: savedUser.email,
          nickname: savedUser.nickname,
          _id: savedUser._id,
        },
      }); // 생성된 사용자 정보 반환
    } catch (err) {
      console.error("회원가입 오류:", err); // 에러 로깅
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
);

// 로그인
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." }); // 메시지 명확화
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." }); // 메시지 명확화
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { email: user.email, nickname: user.nickname, _id: user._id },
    }); // 토큰과 사용자 정보 전달
  } catch (err) {
    console.error("로그인 오류:", err);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// 현재 사용자 정보 조회 (인증 필요)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json(user);
  } catch (err) {
    console.error("사용자 정보 조회 오류:", err);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
