const userReducer = (
  state = {
    token: "",
    logueado: false,
  },
  action
) => {
  switch (action.type) {
    case "@Add":
      return {
        token: action.token,
        login: action.login,
      };

    case "@Remove":
      return { token: "" };
    default:
      return state;
  }
};

export default userReducer;
