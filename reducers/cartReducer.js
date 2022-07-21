const cartReducer = (
  state = {
    cart: [],
    total: 0,
    taxes: [],
    envios: [],
    peso: 0,
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
      const peso = parseInt(state.peso) + parseInt(action.producto.weight);
      return {
        ...state,
        cart: [...state.cart, action.producto],
        total: total.toFixed(2),
        peso: peso,
      };
    case "@RemoveFromCart":
      let totalR = parseFloat(state.total) - parseFloat(action.precio);
      const index = state.cart.findIndex((item) => item.id === action.id);
      const pesoR = parseInt(state.peso) - parseInt(action.peso);
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== index),
        total: totalR.toFixed(2),
        peso: pesoR,
      };

    case "@EMPTY_CART":
      return {
        ...state,
        cart: [],
        total: 0,
        peso: 0,
      };

    case "@setTaxes":
      return {
        cart: state.cart,
        total: state.total,
        taxes: action.taxes,
        envios: state.envios,
        metodos: state.metodos,
        peso: state.peso,
      };
    case "@setShipping":
      const envios = Object.values(action.envios[0].envios).map((key) => {
        return key;
      });
      return {
        cart: state.cart,
        total: state.total,
        taxes: state.taxes,
        envios: envios,
        peso: state.peso,
      };
    default:
      return state;
  }
};

export default cartReducer;
