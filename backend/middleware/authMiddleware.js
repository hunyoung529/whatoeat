const jwt = require("jsonwebtoken");
const User = require("../models/User"); // 사용자 모델

const authMiddleware = async (req, res, next) => {
  try {
    // 요청 헤더에서 토큰 추출
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "인증 토큰이 없습니다." });
    }

    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰에서 추출한 사용자 ID로 사용자 정보 조회
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }

    // 요청 객체에 사용자 정보 추가
    req.user = user;

    // 다음 미들웨어 또는 라우트 핸들러로 진행
    next();
  } catch (err) {
    res.status(401).json({ message: "인증에 실패했습니다." });
  }
};

module.exports = authMiddleware;
