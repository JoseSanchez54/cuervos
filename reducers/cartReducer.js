const cartReducer = (
  state = {
    cart: [],
    total: 0,
    taxes: [],
    envios: [],
  },
  action
) => {
  switch (action.type) {
    case "@AddToCart":
      let total =
        parseFloat(state.total) +
        (parseFloat(action.producto.sale_price)
          ? parseFloat(action.producto.sale_price)
          : parseFloat(action.producto.regular_price));
      return {
        ...state,
        cart: [...state.cart, action.producto],
        total: total.toFixed(2),
      };
    case "@RemoveFromCart":
      let totalR = parseFloat(state.total) - parseFloat(action.precio);
      let cartR = state.cart.filter((item) => item.id !== action.id);
      const index = state.cart.findIndex((item) => item.id === action.id);
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== index),
        total: totalR.toFixed(2),
      };

    case "@EMPTY_CART":
      return {
        ...state,
        cart: [],
        total: 0,
      };

    //const newCart = state.cart.filter((item) => item.id !== action.id);
    /*    return {
        ...state,
        cart: newCart,
        total: (parseFloat(state.total) - parseFloat(action.precio)).toFixed(2),
      }; */

    case "@setTaxes":
      return {
        cart: state.cart,
        total: state.total,
        taxes: action.taxes,
        envios: state.envios,
        metodos: state.metodos,
      };
    case "@setShipping":
      return {
        cart: state.cart,
        total: state.total,
        taxes: state.taxes,
        envios: action.envios,
        metodos: action.metodos,
      };
    default:
      return state;
  }
};

export default cartReducer;
