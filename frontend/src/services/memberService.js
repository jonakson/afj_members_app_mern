import axios from "axios";

const API_URL = "/api/v1/members/";

// Register Member
const register = async (memberData) => {
  const response = await axios.post(API_URL, memberData);

  if (response.data) {
    localStorage.setItem("member", JSON.stringify(response.data));
  }

  return response.data;
};

const memberService = {
  register,
};

export default memberService;
