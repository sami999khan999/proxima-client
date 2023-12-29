import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logOut = () => {
    // clear localStroage
    localStorage.removeItem("user");
    // dispathc logout
    dispatch({ type: "LOGOUT" });
  };

  return { logOut };
};
