const testReducer = (
  state = {
    cart: [],
    total: 0,
  },
  action
) => {
  switch (action.type) {
    case "@AddToCart":
      let totalE = parseFloat(state.total) + parseFloat(action.precio);
      return {
        cart: [
          ...state.cart,
          {
            id: action.id,
            precio: action.precio,
            cantidad: action.cantidad,
            atributo: action.atributo,
          },
        ],
        total: totalE.toFixed(2),
      };
    case "@RemoveFromCart":
      for (let i = 0; i < 1; i++) {
        if (state.cart[i].id === action.id) {
          let totalE = parseFloat(state.total) - parseFloat(action.precio);
          return {
            cart: state.cart.slice(0, i).concat(state.cart.slice(i + 1)),
            total: totalE.toFixed(2),
          };
        }
      }
    //const newCart = state.cart.filter((item) => item.id !== action.id);
    /*    return {
        ...state,
        cart: newCart,
        total: (parseFloat(state.total) - parseFloat(action.precio)).toFixed(2),
      }; */

    default:
      return state;
  }
};

export default testReducer;
