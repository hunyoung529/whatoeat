const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const router = express.Router();
const cors = require("cors");

// CORS 설정
const corsOptions = {
  origin: "*", // 모든 출처 허용. 필요에 따라 특정 도메인으로 제한 가능.
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// CORS 미들웨어 적용
router.use(cors(corsOptions));

// 프록시 설정
router.use(
  "/api",
  createProxyMiddleware({
    target: "http://openapi.foodsafetykorea.go.kr",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // `/proxy`를 제거하고 대상 서버로 전달
    },
  })
);

// 테스트 엔드포인트
router.get("/", (req, res) => {
  res.json({ message: "Recipes endpoint is working!" });
});

module.exports = router;
