import Cookies from "js-cookie";
const session = Cookies.get("voyexUserName");

export const getSession = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("⭕", session);
  return {
    username: session,
    email: "johndoe@gmail.com",
    role: "regular",
  };
};
