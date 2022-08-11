/**
 * It takes two arguments, a selection object and a list of products, and returns the product that
 * matches the selection
 * @param seleccion - is the object that contains the selected attributes.
 * @param lista - this is the list of products that I get from the API.
 * @returns the object that matches the attributes of the product selected.
 */
export const addToCart = (seleccion, lista) => {
  const atributos = Object.keys(seleccion);
  const valores = Object.values(seleccion);
  let attributes = [];

  for (let i = 0; i < atributos.length; i++) {
    attributes.push({
      name: atributos[i],
      option: valores[i],
    });
  }
  for (let i = 0; i < lista.length; i++) {
    let arr = [];
    lista[i].attributes.map((attr) => {
      const { id, ...res } = attr;
      arr.push(res);
    });
    if (JSON.stringify(arr) === JSON.stringify(attributes)) {
      return lista[i];
    }
  }
};
