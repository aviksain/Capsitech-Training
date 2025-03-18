import axiosInstance from "../utils/axiosInstance";

const registerUser = async (userDetails) => {
  try {
    const res = await axiosInstance.post("/users/sign-up", userDetails);
    console.log("User Registered:", res.data);
    return res;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else {
      console.error("Axios Error:", error.message);
    }
  }
};


const loginUser = async (userDetails) => {
  const loginDetails = {
    email: userDetails.email,
    password: userDetails.password,
  };

  const res = await axiosInstance.post("/users/login", loginDetails);

  return res;
};

const getCurrentUser = async () => {
  const user = await axiosInstance.get("/users/current-user");
  return user;
};

const logoutUser = async () => {
  await axiosInstance.post("/users/logout");
};

export { registerUser, loginUser, getCurrentUser, logoutUser };
