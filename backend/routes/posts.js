const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // 게시글 모델
const authMiddleware = require("../middleware/authMiddleware"); // 인증 미들웨어
const { body, validationResult } = require("express-validator"); // 유효성 검사

// 게시글 생성 (인증 필요, 유효성 검사 추가)
router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("제목을 입력해주세요."),
    body("content").notEmpty().withMessage("내용을 입력해주세요."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Post({
        ...req.body,
        author: req.user._id, // 작성자 ID 추가 (인증된 사용자)
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 게시글 목록 조회 (페이지네이션 추가)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // 페이지 번호 (기본값: 1)
    const limit = parseInt(req.query.limit) || 10; // 페이지당 게시글 수 (기본값: 10)
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate("author", "username"); // 작성자 정보 포함
    const totalPosts = await Post.countDocuments(); // 전체 게시글 수
    console.log("ㅎㅇㅎㅇ");

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 게시글 조회
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 게시글 수정 (인증 필요, 작성자 확인)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 게시글 삭제 (인증 필요, 작성자 확인)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
