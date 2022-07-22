import { useOptions } from "../../hooks/useOptions";
import WooCommerce from "../../woocommerce/Woocommerce";
import dynamic from "next/dynamic";
import axios from "axios";
const Head = dynamic(() => import("next/head"), { ssr: false });
const Nav = dynamic(() => import("../../components/Nav"), { ssr: false });
const Footer = dynamic(() => import("../../components/Footer"), { ssr: false });
export async function getStaticProps(context) {
  const options = await axios.get(
    process.env.URLBASE + "wp-json/jet-cct/opciones_generales/"
  );
  const categoriasAll = await WooCommerce.get(
    "products/categories?order=desc"
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
                  Política de cookies
                </h1>
              </div>

              <main className="p-5 pt-20 mx-auto sm:container">
                <p>
                  El dominio {nombre_web} utiliza procedimientos automáticos de
                  recogida (Cookies) para reunir información personal como puede
                  ser el tipo de navegador o sistema operativo, página de
                  referencia, ruta, dominio ISP (Proveedor de Internet), etc.
                  todo ello con el fin de mejorar los servicios prestados. Las
                  Cookies nos ayudan a adaptar esta página web a sus necesidades
                  personales.
                </p>
                <p>
                  Una &quot;Cookie&quot; es un pequeño archivo que se almacena
                  en el ordenador del usuario y nos permite reconocerle. El
                  conjunto de &quot;cookies&quot; nos ayuda a mejorar la calidad
                  de nuestra web, permitiéndonos así personalizar hasta cierto
                  punto la navegación de cada usuario por nuestra web. Las
                  cookies actualmente son esenciales para el funcionamiento de
                  internet, aportando innumerables ventajas en la prestación de
                  servicios interactivos, facilitándole la navegación y
                  usabilidad de nuestra web.
                </p>
                <p>
                  Tenga en cuenta que las cookies no pueden dañar su equipo y
                  que, a cambio, el que estén activadas nos ayudan a identificar
                  y resolver los errores y mejorar la navegabilidad de nuestro
                  sitio.
                </p>
                <b>Tipología de cookies:</b>
                <p>
                  Para una mayor información del usuario sobre la tipología y
                  uso de las cookies le informamos que:
                </p>
                <p>
                  • Desde el punto de vista de ‘tiempo de vida’ de la cookie
                  (tiempo que la cookie permanece activa en nuestro equipo)
                  podemos diferenciar las cookies entre:
                </p>
                <ul>
                  <li>
                    1. Cookies de sesión: son cookies temporales que permanecen
                    en el archivo de cookies de su navegador hasta que abandone
                    la página web, por lo que ninguna queda registrada en el
                    disco duro del usuario. La información obtenida por medio de
                    estas cookies, sirven para analizar pautas de tráfico en la
                    web. A la larga, esto nos permite proporcionar una mejor
                    experiencia para mejorar el contenido y facilitando su uso.{" "}
                  </li>
                  <li>
                    2. Cookies persistentes: son almacenadas en el disco duro y
                    nuestra web las lee cada vez que usted realiza una nueva
                    visita. Una cookie permanente posee una fecha de expiración
                    determinada. La cookie dejará de funcionar después de esa
                    fecha. Las utilizamos, generalmente, para facilitar la
                    experiencia del usuario recordando sus hábitos de navegación
                    o, en su caso, facilitar los servicios de compra y/o
                    registro.
                  </li>
                </ul>
                <p>
                  • Desde el punto de vista de la finalidad de cada cookie,
                  podemos diferenciar entre:
                </p>
                <p>
                  1. Cookies Técnicas: son aquellas que permiten al usuario la
                  navegación a través de una página web, plataforma o aplicación
                  y la utilización de las diferentes opciones o servicios que en
                  ella existan, incluyendo aquellas que el editor utiliza para
                  permitir la gestión y operativa de la página web y habilitar
                  sus funciones y servicios.{" "}
                </p>
                <p>
                  Las cookies técnicas, siempre que correspondan a alguno de los
                  siguientes perfiles, estarán exceptuadas del cumplimiento de
                  las obligaciones establecidas en el artículo 22.2 de la LSSI*
                  (es decir, obtención de consentimiento para su instalación y
                  uso mediante la existencia de banner de aviso, política de
                  cookies):
                </p>
                <ul>
                  <li> Cookies de &quot;entrada del usuario&quot;</li>
                  <li>
                    {" "}
                    Cookies de autenticación o identificación de usuario
                    (únicamente de sesión)
                  </li>
                  <li> Cookies de seguridad del usuario</li>
                  <li> Cookies de sesión de reproductor multimedia</li>
                  <li> Cookies de sesión para equilibrar la carga</li>
                  <li> Cookies de personalización de la interfaz de usuario</li>
                  <li>
                    {" "}
                    Cookies de complemento (plug-in) para intercambiar
                    contenidos sociales
                  </li>
                </ul>
                <p>
                  * según el Grupo de Trabajo de Expertos de la UE, en el
                  Artículo 29 de su Dictamen 4/2012
                </p>
                <p>
                  {" "}
                  <b>2. Cookies de preferencias o personalización:</b> son
                  aquellas que permiten recordar información para que el usuario
                  acceda al servicio con determinadas características que pueden
                  diferenciar su experiencia de la de otros usuarios, como, por
                  ejemplo, el idioma, el número de resultados a mostrar cuando
                  el usuario realiza una búsqueda, el aspecto o contenido del
                  servicio en función del tipo de navegador a través del cual el
                  usuario accede al servicio o de la región desde la que accede
                  al servicio, etc.Si es el propio usuario quien elige esas
                  características (por ejemplo, si selecciona el idioma de un
                  sitio web clicando en el icono de la bandera del país
                  correspondiente), las cookies estarán exceptuadas de las
                  obligaciones del artículo 22.2 de la LSSI por considerarse un
                  servicio expresamente solicitado por el usuario, y ello
                  siempre y cuando las cookies obedezcan exclusivamente a la
                  finalidad seleccionada.
                </p>
                <p>
                  <b>3. Cookies de análisis o medición:</b> son aquellas que
                  permiten al responsable de estas el seguimiento y análisis del
                  comportamiento de los usuarios de los sitios web a los que
                  están vinculadas, incluida la cuantificación de los impactos
                  de los anuncios. La información recogida mediante este tipo de
                  cookies se utiliza en la medición de la actividad de los
                  sitios web, aplicación o plataforma, con el fin de introducir
                  mejoras en función del análisis de los datos de uso que hacen
                  los usuarios del servicio.
                </p>
                <p>
                  <b>4. Cookies de publicidad comportamental:</b> son aquellas
                  que almacenan información del comportamiento de los usuarios
                  obtenida a través de la observación continuada de sus hábitos
                  de navegación, lo que permite desarrollar un perfil específico
                  para mostrar publicidad en función de este.{" "}
                </p>
                <p>
                  • Como último, desde el punto de vista de la entidad que
                  gestiona las cookies, podemos diferenciar entre:
                </p>
                <p>
                  <b>1. Cookies propias:</b> son aquellas que se envían al
                  equipo terminal del usuario desde un equipo o dominio
                  gestionado por el propio editor y desde el que se presta el
                  servicio solicitado por el usuario.
                </p>
                <p>
                  <b>2. Cookies de tercero:</b> son aquellas que se envían al
                  equipo terminal del usuario desde un equipo o dominio que no
                  es gestionado por el editor, sino por otra entidad que trata
                  los datos obtenidos través de las cookies.
                </p>
                <p>
                  {" "}
                  {nombre} guarda toda la información recogida a través de las
                  Cookies en un formato no personalizado (dirección de IP). Este
                  tipo de información obtenida a través de las Cookies no será
                  revelado fuera de {nombre} salvo en aquellos casos indicados
                  en el apartado &quot;Relación y descripción de cookies&quot;,
                  ni utilizada para comunicaciones no solicitadas.
                </p>
                <p>
                  En caso de que el usuario lo quisiera, el registro de las
                  cookies podrá estar sujeto a su aceptación durante la
                  instalación o puesta al día del navegador usado. El usuario
                  puede en todo momento revocar su aceptación mediante las
                  opciones de configuración de contenidos y privacidad
                  disponibles en cada navegador. No obstante, en caso de que el
                  usuario no permita la instalación de cookies en su navegador
                  es posible que no pueda acceder a alguna de las secciones de
                  nuestro sitio web.
                </p>
                <p>
                  Para más información sobre la configuración apropiada de las
                  cookies y las opciones de activación, restricción y/o
                  inhabilitación se debe acudir en la sección de ayuda de su
                  navegador para conocer más:
                </p>
                <ul>
                  <li>
                    <a
                      href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=es"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Más información sobre como bloquear el uso de las cookies
                      en Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Más información sobre como bloquear el uso de las cookies
                      en Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/topic/cómo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Más información sobre como bloquear el uso de las cookies
                      en Internet Explorer
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/topic/cómo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      • Más información sobre como bloquear el uso de las
                      cookies en Microsoft Edge
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noreferrer"
                    >
                      • Más información sobre como bloquear el uso de las
                      cookies en Safari: en el Mac
                    </a>
                  </li>
                </ul>
                <p>
                  • Más información sobre como bloquear el uso de las cookies en
                  Safari: en el iPhone, iPad o iPod touch
                </p>
                <p>
                  Muchos navegadores permiten activar un modo privado mediante
                  el cual las cookies se borran siempre después de su visita.
                  Dependiendo de cada navegador este modo privado, puede tener
                  diferentes nombres. A continuación, encontrará una lista de
                  los navegadores más comunes y los diferentes nombres de este
                  &quot;modo privado&quot;:{" "}
                </p>
                <ul>
                  <li>• Internet Explorer 8 y superior; InPrivate </li>
                  <li>• Safari 2 y superior; Navegación Privada </li>
                  <li>• Opera 10.5 y superior; Navegación Privada </li>
                  <li>• Fire Fox 3.5 y superior; Navegación Privada </li>
                  <li>• Google Chrome 10 y superior; Incógnito</li>
                </ul>
                <p>
                  <b>Relación y descripción de cookies:</b>
                </p>
                <p>
                  La tabla que publicamos a continuación recoge de forma
                  esquematizada las cookies anteriormente descritas y utilizadas
                  en el sitio web {nombre_web} :
                </p>
                <table className="tg">
                  <thead>
                    <tr>
                      <th className="tg-0pky">Nombre de cookie </th>
                      <th className="tg-0pky">
                        Dominio de cookie (Propias/terceros)
                      </th>
                      <th className="tg-0lax">
                        Duración(sesión, persistente){" "}
                      </th>
                      <th className="tg-0lax">
                        Uso de cookie
                        (Finalidad)(Técnicas-Preferencias-Analíticas-Publicidad)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tg-phtq">_ga </td>
                      <td className="tg-phtq">{nombre_web} </td>
                      <td className="tg-hmp3">2 años</td>
                      <td className="tg-hmp3">
                        Cookies analíticas (Google Analytics): Utiliza un
                        identificador anónimo para distinguir usuarios anónimos
                        y realizar análisis sobre las interacciones de los
                        usuarios en la aplicación con el fin de optimizar los
                        servicios que se ofrecen{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0pky">_gat </td>
                      <td className="tg-0pky">{nombre_web} </td>
                      <td className="tg-0lax">
                        10 minutos desde creación o modificación
                      </td>
                      <td className="tg-0lax">
                        Cookies analíticas (Google Analytics): Se usa para
                        diferenciar entre los diferentes objetos de seguimiento
                        creados en la sesión. La cookie se crea al cargar la
                        librería JavaScript y no existe una versión previa de la
                        cookie _gat. La cookie se actualiza cada vez que envía
                        los datos a Google Analytics.
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-phtq">_gid </td>
                      <td className="tg-phtq">{nombre_web} </td>
                      <td className="tg-hmp3">1 dia</td>
                      <td className="tg-hmp3">
                        Para identificar a los usuarios
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0pky">
                        cookielawinfo-checkbox-necessary{" "}
                      </td>
                      <td className="tg-0pky">{nombre_web} </td>
                      <td className="tg-0lax">1 hora</td>
                      <td className="tg-0lax">
                        Se emplea para recordar el consentimiento del usuario de
                        las cookies categorizadas como &quot;Necesarias&quot;
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-phtq">
                        cookielawinfo-checkbox-non-necessary{" "}
                      </td>
                      <td className="tg-phtq">{nombre_web} </td>
                      <td className="tg-hmp3">1 hora</td>
                      <td className="tg-hmp3">
                        Se emplea para recordar el consentimiento del usuario de
                        las cookies categorizadas como &quot;No
                        necesarias&quot;.
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0pky">viewed_cookie_policy </td>
                      <td className="tg-0pky">{nombre_web} </td>
                      <td className="tg-0lax">1 año</td>
                      <td className="tg-0lax">
                        Para almacenar si el usuario ha consentido o no al uso
                        de cookies. No guarda ningún dato personal
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-phtq">IDE</td>
                      <td className="tg-phtq">.doubleclick.net</td>
                      <td className="tg-hmp3">1 año</td>
                      <td className="tg-hmp3">
                        Permite que DoubleClick registre las conversiones
                        relacionadas con las impresiones de anuncios, como, por
                        ejemplo, cuando un usuario ve un anuncio de DoubleClick
                        y, posteriormente, usa el mismo navegador para visitar
                        el sitio web del anunciante y realizar una compra.
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0pky">1P_JAR </td>
                      <td className="tg-0pky">.google.com </td>
                      <td className="tg-0lax">1 mes</td>
                      <td className="tg-0lax">
                        Cookie que transfiere datos a Google para hacer la
                        publicidad más atractiva.
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-phtq">NID </td>
                      <td className="tg-phtq">.google.com </td>
                      <td className="tg-hmp3">6 meses</td>
                      <td className="tg-hmp3">
                        Estas cookies son utilizados por Google para almacenar
                        las preferencias del usuario
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0pky">
                        {" "}
                        __Secure-3PAPISID __Secure-3PSID __Secure-3PSIDCC{" "}
                      </td>
                      <td className="tg-0pky">.google.com </td>
                      <td className="tg-0lax">
                        2 años <br /> 1 año
                      </td>
                      <td className="tg-0lax">
                        Estas cookies se utilizan para entregar anuncios más
                        relevantes para usted y sus intereses
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  • Para conocer más sobre las cookies de Google Analytics puede
                  visitar la siguiente página:
                  https://policies.google.com/technologies/cookies?hl=es . Puede
                  desactivar las cookies de Google Analytics a través del
                  siguiente enlace: https://tools.google.com/dlpage/gaoptout
                </p>
                <p>
                  • En este sitio web encontrará información sobre cómo funciona
                  la publicidad basada en el comportamiento, información sobre
                  las cookies y las medidas que usted puede tomar para proteger
                  su privacidad en Internet:
                  http://www.youronlinechoices.com/es/{" "}
                </p>
                <p>
                  • Para más información sobre cookies y sus derechos como
                  usuario puede consultar la Guía sobre el uso de cookies
                  elaborada por la Agencia Española de Protección de Datos con
                  la colaboración de las asociaciones ADIGITAL, Anunciantes,
                  AUTOCONTROL e IAB Spain:
                  https://www.aepd.es/media/guias/guia-cookies.pdf{" "}
                </p>
              </main>
            </div>
          </div>
          <Footer options={optionsSWR}></Footer>
          <style jsx>{`
            .tg {
              border-collapse: collapse;
              border-color: #aabcfe;
              border-spacing: 0;
            }
            .tg td {
              background-color: #e8edff;
              border-color: #aabcfe;
              border-style: solid;
              border-width: 1px;
              color: #669;
              font-family: Arial, sans-serif;
              font-size: 14px;
              overflow: hidden;
              padding: 10px 5px;
              word-break: normal;
            }
            .tg th {
              background-color: #b9c9fe;
              border-color: #aabcfe;
              border-style: solid;
              border-width: 1px;
              color: #039;
              font-family: Arial, sans-serif;
              font-size: 14px;
              font-weight: normal;
              overflow: hidden;
              padding: 10px 5px;
              word-break: normal;
            }
            .tg .tg-phtq {
              background-color: #d2e4fc;

              text-align: left;
              vertical-align: top;
            }
            .tg .tg-hmp3 {
              background-color: #d2e4fc;
              text-align: left;
              vertical-align: top;
            }
            .tg .tg-0pky {
              text-align: left;
              vertical-align: top;
            }
            .tg .tg-0lax {
              text-align: left;
              vertical-align: top;
            }
          `}</style>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
