const userReducer = (
  state = {
    token: "",
    login: false,
    email: "",
    username: "",
  },
  action
) => {
  switch (action.type) {
    case "@Add":
      return {
        ...state,
        token: action.token,
        login: action.login,
      };

    case "@Remove":
      return { token: "" };
    case "@Email":
      return {
        ...state,
        email: action.email,
      };
    case "@Username":
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

export default userReducer;
