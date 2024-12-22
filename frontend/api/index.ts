const API_BASE_URL = "http://localhost:5000/api"; // 백엔드 서버 주소
interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
}
export const signup = async (formData: SignUpFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};
