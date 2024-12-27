const express = require("express");
const router = express.Router();
const cors = require("cors");


// CORS 설정
const corsOptions = {
    origin: "*", // 모든 출처 허용. 필요에 따라 특정 도메인으로 제한 가능.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };


router.use(cors(corsOptions));