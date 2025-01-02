const express = require("express");
const axios = require("axios");
const app = express();


const RECIPES_API_KEY = "06b14851a6244619b5c";

app.get("/recipes", async (req, res) => {
  try {
    const response = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${RECIPES_API_KEY}/COOKRCP01/json/1/5`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});