import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcherWc from "../utils/fetcherWc";
export const useUser = () => {
  const customers = useSWR("customers", fetcherWc);
  const usuario = useSelector((state) => state.userReducer);
  const userCustomer = customers?.data?.find(
    (order) => order?.billing?.email === usuario.email
  );
  let metadata = {};
  let codigoPais = "";
  let codigoProvincia = "";
  if (userCustomer) {
    metadata = Object?.values(userCustomer?.meta_data).map((key) => {
      return key;
    });
    codigoPais = metadata?.filter((m) => m.key === "codigoPais")[0]?.value;
    codigoProvincia = metadata?.filter((m) => m.key === "codigoProvincia")[0]
      ?.value;
  }

  const usuarioActual = {
    id: userCustomer?.id,
    nombre: userCustomer?.billing?.first_name,
    apellido: userCustomer?.billing?.last_name,
    nombreCompleto:
      userCustomer?.billing?.first_name +
      " " +
      userCustomer?.billing?.last_name,
    email: userCustomer?.billing?.email,
    telefono: userCustomer?.billing?.phone,
    direccion: userCustomer?.billing?.address_1,
    ciudad: userCustomer?.billing?.city,
    pais: userCustomer?.billing?.country,
    codigoPostal: userCustomer?.billing?.postcode,
    provincia: userCustomer?.billing?.state,
  };

  return { usuarioActual, userCustomer, usuario, codigoPais, codigoProvincia };
};
