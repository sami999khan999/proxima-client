import { useAuthContext } from "./useAuthContext";
import { useProjectContext } from "./useProjectsContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const { dispatch: projectsDispatch } = useProjectContext();

  const logOut = () => {
    // clear localStroage
    localStorage.removeItem("user");
    // dispathc logout
    logoutDispatch({ type: "LOGOUT" });
    projectsDispatch({ type: "SET_PROJECT", payload: null });
  };

  return { logOut };
};
