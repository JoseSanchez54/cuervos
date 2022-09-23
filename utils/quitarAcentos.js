export default function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
  };
  const nolabel = cadena?.replace(/<[^>]+>/g, "");
  const abc = nolabel
    ?.split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString();
  return abc?.replace(/[^\\da-zA-Z ]/g, "");
}
