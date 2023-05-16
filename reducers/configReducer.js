const configReducer = (
  state = {
    cart: [],
    total: 0,
    peso: 0,
  },
  action
) => {
  switch (action.type) {
    case "@Add":
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
    case "@Remove":
      let totalR = parseFloat(state.total) - parseFloat(action.precio);
      const index = state.cart.findIndex((item) => item.id === action.id);
      const pesoR = parseInt(state.peso) - parseInt(action.peso);
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== index),
        total: totalR.toFixed(2),
        peso: pesoR,
      };

    case "@EMPTY":
      return {
        ...state,
        cart: [],
        total: 0,
        peso: 0,
      };
    default:
      return state;
  }
};

export default configReducer;
