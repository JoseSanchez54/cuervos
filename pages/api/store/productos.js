import { db } from "../../../utils/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
const productos = collection(db, "productos");
const guardarProductos = () => {
  addDoc(productos, {
    nombre: req.query.nombre,
    cif: req.query.cif,
    password: req.query.password,
  });
};
const getColegios = async () => {
  const productosSnapshot = await getDocs(productos);
  const productosList = productosSnapshot.docs.map((doc) => doc.data());
  return productosList;
};
export default async (req, res) => {};
