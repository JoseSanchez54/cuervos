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
    case "@AddUser":
      return {
        ...state,
        token: action.token,
        login: true,
        email: action.email,
      };

    case "@Remove":
      return {
        token: "",
        login: false,
        email: "",
        username: "",
      };
    case "@Email":
      return {
        ...state,
        email: action.email,
      };
    case "@Username":
      return {
        ...state,
        username: action.email,
      };
    default:
      return state;
  }
};

export default userReducer;
