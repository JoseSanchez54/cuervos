import { useOptions } from "../../hooks/useOptions";
import dynamic from "next/dynamic";
import WooCommerce from "../../woocommerce/Woocommerce";
import axios from "axios";

const Head = dynamic(() => import("next/head"), { ssr: false });
const Link = dynamic(() => import("next/link"), { ssr: false });
const Footer = dynamic(() => import("../../components/Footer"), { ssr: false });
const Nav = dynamic(() => import("../../components/Nav"), { ssr: false });
export async function getStaticProps(context) {
  const options = await axios.get(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales/",
    {
      headers: { "User-Agent": "Axios 0.21.1" },
    }
  );
  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc&per_page=100"
  ).then((response) => {
    return response.data;
  });
  return {
    props: {
      options: options.data[0],
      categoriasAll,
    },
    revalidate: 10, //, revalidate: 10, // In seconds
  };
}
export default function AvisoLegal(props) {
  const { options: optionsSWR, isLoading } = useOptions(props.options);

  let nombre = optionsSWR?.nombre_legal;

  let direccion = optionsSWR?.direccion;

  let cif = optionsSWR?.cif;

  let telefono = optionsSWR?.telefono;

  let email = optionsSWR?.email_legal;

  let nombre_web = optionsSWR?.dominio_web_;

  let registro = optionsSWR?.regitro_mercantil;

  return (
    <>
      {!isLoading ? (
        <>
          <Head>
            <title>{optionsSWR?.nombre_sitio}</title>
            <meta name="description" content={optionsSWR?.descripcion_sitio} />
            <link rel="icon" href={optionsSWR?.favicon_principal} />
          </Head>
          <Nav categorias={props.categoriasAll} opciones={props.options} />
          <div className="flex flex-row justify-center w-full ">
            <div className="flex flex-col items-center h-full">
              <div className="flex flex-row justify-center w-full mt-9">
                <h1 className="text-2xl font-semibold md:text-4xl">
                  Aviso Legal
                </h1>
              </div>

              <main className="p-5 pt-20 mx-auto sm:container">
                <p>
                  En virtud del cumplimiento de la Ley 34/2002, de 11 de Julio,
                  de Servicios de la Sociedad de la Información y de
                  <br /> Comercio Electrónico, le informamos:
                </p>
                <p>
                  <b>1. Objeto.</b>
                  <br /> El prestador de servicios de la página web {
                    nombre_web
                  }{" "}
                  es {nombre} con domicilio social en {direccion} . La empresa
                  consta inscrita en el Registro Mercantil de {registro}.
                </p>
                <p>
                  A efectos de este documento el teléfono de contacto es{" "}
                  {telefono} y el correo electrónico de contacto es {email}.
                </p>
                <p>Este Aviso Legal regula la utilización de dicho dominio.</p>
                <p>
                  {" "}
                  La utilización de este sitio web implica la aceptación por
                  parte del Usuario de las condiciones de uso incluidas en este
                  Aviso como también nuestras políticas sobre ‘Protección de
                  Datos y Privacidad’ y ‘Política de uso de Cookies’. En el caso
                  de que ciertos servicios contenidos y/o herramientas ofrecidas
                  a través de este “Portal” requirieran de la aplicación
                  condiciones particulares estas se pondrán a disposición del
                  Usuario.
                </p>
                <p>
                  Por otra parte, {nombre}. advierte que, tanto los contenidos y
                  servicios de esta página web como las propias condiciones de
                  utilización, pueden ser modificados sin notificación previa.
                </p>
                <b>2. Condiciones Generales de Uso.</b> <br />
                <p>
                  El Usuario se compromete a que, en los apartados en que sea
                  necesario que se registre para poder acceder a los mismos,
                  facilitar datos veraces, exactos y completos sobre su
                  identidad. Además, se compromete a mantener actualizados los
                  datos personales que pudieran ser proporcionados a titular del
                  dominio, por lo tanto, único responsable de las falsedades o
                  inexactitudes que realice.
                </p>
                <p>
                  Se informa que en caso de ser menor de edad deberá obtener el
                  permiso de sus padres, tutores o representantes legales para
                  poder acceder a los servicios prestados. {nombre} . no se
                  responsabiliza en el caso de que los datos sobre este tema
                  sean inexactos o falsos.
                </p>
                <p>
                  El “portal” sólo puede ser utilizado con propósitos legales
                  por tanto el usuario se obliga a hacer un uso lícito y honrado
                  del portal y conforme a las presentes Condiciones Generales de
                  Uso, a no utilizar los servicios del “portal” para la
                  realización de actividades contrarias a las legislación
                  española, a la moral y al orden público, asumiendo por parte
                  del usuario todas las responsabilidades de daños y perjuicios
                  frente al titular del dominio o terceros que pudieran
                  derivarse de prácticas ilegales o no permitidas entres otras y
                  a título enunciativo y no limitativo:
                </p>
                <p>
                  {" "}
                  Realizar sin previo consentimiento por parte del titular del
                  dominio cualquier manipulación o alteración de esta página, no
                  asumiendo el titular del dominio ninguna responsabilidad que
                  pudiera derivarse, de dicha manipulación o alteración por
                  terceros
                </p>
                <p>
                  Realizar cualquier acto que pueda dañar, inutilizar,
                  sobrecargar, o deteriorar el Portal y los servicios y/o
                  impedir el normal uso y utilización por parte de los Usuarios
                </p>
                <p>
                  Introducir y/o utilizar programas de ordenador, datos,
                  archivos defectuosos, virus, código malicioso, equipos
                  informáticos o de telecomunicaciones o cualquier otro,
                  independientemente de su naturaleza que pueda causar daños en
                  el Portal, en cualquiera de los servicios, o en cualesquiera
                  activos (físicos o lógicos) de los sistemas de información de
                  titular del dominio
                </p>
                <p>
                  Violar los derechos de terceros a la intimidad, la propia
                  imagen, la protección de datos al secreto en las
                  comunicaciones, a la propiedad intelectual e industrial.
                </p>
                <p>
                  Ocultar y falsear el origen de mensajes de correo electrónico.
                </p>
                <p>
                  Utilizar identidades falsas, suplantar la identidad de otros
                  en la utilización del Portal o en la utilización de cualquiera
                  de los servicios.
                </p>
                <p>
                  Reproducir, distribuir, modificar o copiar el contenido de
                  esta página, salvo que de disponga de la autorización del
                  titular del dominio o esté legalmente autorizado.
                </p>
                <p>
                  Transmitir a terceros no autorizados los nombres de Usuario y
                  las claves de acceso.
                </p>
                <p>
                  {nombre}. no responde de los enlaces (LINKS) a otras páginas
                  de Internet de terceros y su existencia no implica que{" "}
                  {nombre}. apruebe o acepte sus contenidos y servicios. Estas
                  otras páginas web no están controladas por {nombre}. ni
                  cubiertas por la presente Política de Privacidad. Si accede a
                  otras páginas web utilizando los enlaces proporcionados, los
                  operadores de dichos sitios web podrán recoger su información
                  personal. Asegúrese que está conforme con las Políticas de
                  Privacidad de estas terceras páginas web antes de facilitar
                  ningún tipo de información personal.
                </p>
                <p>
                  Con carácter general, el titular del dominio, excluye su
                  responsabilidad por los daños y perjuicios de cualquier
                  naturaleza e índole que pudieran derivarse del uso del sitio
                  web de, así como a los daños y perjuicios derivados de la
                  infracción de los derechos de propiedad Intelectual e
                  Industrial por parte de los usuarios y/o la falta de
                  veracidad, exactitud, y actualidad de los contenidos, ni le
                  podrán ser exigidas responsabilidades por la interrupción del
                  servicio, inadecuado funcionamiento o imposibilidad de acceso
                  al servicio.
                </p>
                <p>
                  El titular del dominio no será responsable por los daños y
                  perjuicios causados por la presencia de virus o cualquier otro
                  software lesivo que pueda producir alteraciones en el sistema
                  informático del Usuario.
                </p>
                <p>
                  El sitio web, incluyendo a título enunciativo, pero no
                  limitativo, su programación, diseños, logotipos, texto y/o
                  gráficos son propiedad del prestador o en su caso dispone de
                  licencia o autorización expresa por parte de los autores.
                </p>
                <p>
                  Independientemente de la finalidad para la que fueran
                  destinados, la reproducción total o parcial, uso, explotación,
                  distribución y comercialización, requiere en todo caso de la
                  autorización escrita previa por parte del titular del dominio.
                </p>
                <p>
                  El usuario se compromete a no realizar ningún acto en contra
                  de los derechos de propiedad intelectual o industrial del
                  autor.
                </p>
                <p>
                  El prestador de servicios de la web autoriza expresamente a
                  que terceros puedan redirigir directamente a los contenidos
                  concretos del sitio web, debiendo en todo caso redirigir al
                  sitio web principal del prestador.
                </p>
                <b>3. Uso de cookies</b>
                <p>
                  {nombre}. en calidad de prestador de servicios de esta web
                  declara que utiliza procedimientos automáticos de recogida de
                  información para guardar el registro de los Usuarios que
                  visitan su página web.{" "}
                  <Link href="/legal/politica_cookies" passHref>
                    <a>
                      <span className="text-blue-900">
                        Pulsa aquí para acceder en nuestra política de uso de
                        cookies
                      </span>
                    </a>
                  </Link>{" "}
                </p>
                <b>4. Protección de datos</b>
                <p>
                  Puede consultar nuestra política sobre protección de datos de
                  carácter personal en el siguiente{" "}
                  <Link href="/legal/politica-de-privacidad" passHref>
                    <a>
                      <span className="text-blue-900">apartado</span>
                    </a>
                  </Link>
                </p>
                <b>5. Legislación aplicable</b>
                <p>
                  Las presentes Condiciones Generales de Uso se regirán en todo
                  momento por lo dispuesto en la legislación española.
                </p>
              </main>
            </div>
          </div>
          <Footer options={optionsSWR}></Footer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
