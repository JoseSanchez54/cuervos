import { useOptions } from "../../hooks/useOptions";
import dynamic from "next/dynamic";
import WooCommerce from "../../woocommerce/Woocommerce";
import axios from "axios";
const Head = dynamic(() => import("next/head"), { ssr: false });
const Footer = dynamic(() => import("../../components/Footer"), { ssr: false });
const Nav = dynamic(() => import("../../components/Nav"), { ssr: false });
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
export default function PoliticaDePrivacidad(props) {
  const { options: optionsSWR, isLoading } = useOptions(props.options);
  console.log(optionsSWR);

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
                  Política de privacidad
                </h1>
              </div>

              <main className="p-5 pt-20 mx-auto sm:container">
                <b>Política de Protección de datos de {nombre}</b>.
                <br />
                <b>1. ¿Quién es el Responsable de tratamiento de sus datos?</b>
                <p>
                  El responsable de los tratamientos de datos referentes a los
                  distintos procesos con respecto la gestión de usuarios,
                  clientes, clientes potenciales, colaboradores y proveedores es{" "}
                  {nombre}, con domicilio social en {direccion} y CIF {cif}.
                </p>
                <p>
                  A efectos de nuestra política de protección de datos el
                  teléfono de contacto es {telefono} y el correo electrónico de
                  contacto es {email}.
                </p>
                <b>
                  2. ¿Qué tipo de datos tenemos sobre su persona y cómo los
                  hemos obtenido?
                </b>
                <p>
                  Las categorías de datos personales que {nombre} trata sobre
                  sus clientes y proveedores son:
                </p>
                <ul>
                  <li>• Datos de identificación</li>
                  <li>• Direcciones postales o electrónicas</li>
                  <li>• Información comercial</li>
                  <li>• Datos económicos y de transacciones</li>
                </ul>
                <p>
                  Todos los datos arriba mencionados los hemos obtenido o
                  directamente de Usted mediante la presentación de una oferta
                  comercial, propuesta contractual, etc. o mediante su empresa
                  al facilitarnos los datos de identificación y demás
                  información necesaria para llevar al cabo el objeto de la
                  relación contractual entre las partes. Será una obligación
                  suya o de su empresa facilitarnos los datos actualizados en
                  caso de modificación. Con respecto a los datos de candidatos a
                  empleo hemos obtenido sus datos mediante la presentación de un
                  CV por su parte o la obtención de su candidatura mediante los
                  servicios de un portal de empleo. En este último caso Usted ha
                  autorizado dicha cesión de sus datos a nuestra empresa al
                  insertar sus datos curriculares en el portal de empleo.
                </p>
                <b>3. ¿Por cuánto tiempo conservaremos sus datos?</b>
                <p>
                  Los datos personales relativos a personas físicas vinculadas a
                  clientes potenciales, clientes y proveedores que {nombre}.
                  recopile mediante los distintos formularios de contacto y/o
                  recogida de información se conservarán mientras no se solicite
                  su supresión por el interesado. Los datos proporcionados por
                  nuestros clientes y proveedores se conservarán mientras se
                  mantenga la relación mercantil entre las partes respetando en
                  cualquier caso los plazos mínimos legales de conservación
                  según la materia.
                </p>
                <p>
                  En cualquier caso {nombre} guardará sus datos personales
                  durante el período de tiempo que sea razonablemente necesario
                  teniendo en cuenta nuestras necesidades de dar respuesta a
                  cuestiones que se planteen o resolver problemas, realizar
                  mejoras, activar nuevos servicios y cumplir los requisitos que
                  exija la legislación aplicable. Esto significa que podemos
                  conservar tus datos personales durante un período de tiempo
                  razonable incluso después de que hayas dejado de usar nuestros
                  productos o de que hayas dejado de usar esta página web.
                  Después de este período, tus datos personales serán eliminados
                  de todos los sistemas de {nombre}
                </p>
                <b>
                  4. ¿Con qué finalidad y sobre qué base de legitimación
                  tratamos sus datos?
                </b>
                <p>
                  En {nombre} tratamos los datos que nos facilitan las personas
                  interesadas con el fin de gestionar distintas actividades
                  derivadas de procedimientos específicos realizados en materia
                  de ventas, servicio post venta, gestión de proveedores,
                  gestión de candidatos, calidad de servicios, etc. De esta
                  manera, utilizaremos sus datos para llevar al cabo algunas de
                  las siguientes acciones basándonos en la respectiva base de
                  legitimación:
                </p>
                <table className="tg">
                  <thead>
                    <tr>
                      <th className="tg-0lax">FINALIDAD DE TRATAMIENTO</th>
                      <th className="tg-0lax">BASE DE LEGITIMACIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tg-hmp3">
                        Gestión de los derechos de los interesados en materia de
                        protección de datos
                      </td>
                      <td className="tg-hmp3">Obligación regulatoria</td>
                    </tr>
                    <tr>
                      <td className="tg-0lax">
                        Gestión contable, fiscal, administrativa y facturación
                        de clientes
                      </td>
                      <td className="tg-0lax">
                        Ejecución (pre)contrato; Obligación regulatoria
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-hmp3">
                        Gestión de datos de clientes para realizar
                        pagos-transferencias y domiciliaciones/contable/fiscal y
                        facturación
                      </td>
                      <td className="tg-hmp3">
                        Ejecución (pre)contrato; Obligación regulatoria
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0lax">
                        Operaciones en la segmentación de potenciales clientes,
                        realización de campañas de captación, exclusión
                        publicitaria
                      </td>
                      <td className="tg-0lax">Consentimiento del afectado</td>
                    </tr>
                    <tr>
                      <td className="tg-hmp3">
                        Gestión de operaciones de publicidad y marketing para la
                        fidelización de clientes
                      </td>
                      <td className="tg-hmp3">
                        Interés Legítimo, ejecución contrato
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0lax">
                        Operaciones en campañas a través de medios electrónicos
                        con potenciales clientes (Redes de comunicaciones
                        electrónicas o prestación de un servicio de la sociedad
                        de la información)
                      </td>
                      <td className="tg-0lax">Consentimiento del afectado</td>
                    </tr>
                    <tr>
                      <td className="tg-hmp3">
                        Tratamiento de datos destinado al envió de publicidad
                        individualizada de clientes y prospección comercial
                      </td>
                      <td className="tg-hmp3">Consentimiento del afectado</td>
                    </tr>
                    <tr>
                      <td className="tg-0lax">
                        Gestión fiscal, contable y administrativa con
                        proveedores
                      </td>
                      <td className="tg-0lax">
                        Ejecución (pre)contrato; Obligación regulatoria
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-hmp3">
                        Realizar pagos-transferencias y
                        domiciliaciones/contable/fiscal y facturación de
                        proveedores
                      </td>
                      <td className="tg-hmp3">
                        Ejecución (pre)contrato; Obligación regulatoria{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="tg-0lax">
                        Procesos de búsqueda, evaluación y selección de
                        candidatos
                      </td>
                      <td className="tg-0lax">Consentimiento del afectado</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  En cuanto, a la base de legitimación referenciada Usted se
                  encuentra obligado a facilitar los datos personales, en el
                  supuesto de que no facilite sus datos de carácter personal no
                  se podrá ejecutar su contrato, cumplir las obligaciones
                  legales o derivadas de los poderes públicos.
                </p>
                <b>5. ¿Á que destinatarios se comunicarán sus datos?</b>
                <p>
                  {nombre} nunca compartirá tus datos personales con ninguna
                  empresa tercera que pretenda utilizarlos en sus acciones de
                  marketing directo, excepto en el caso de que nos hayas
                  autorizado expresamente a ello.
                </p>
                <p>
                  Le informamos que podemos facilitar tus datos personales a
                  organismos de la Administración Pública y Autoridades
                  competentes en aquellos casos que {nombre} reciba un
                  requerimiento legal por parte de dichas Autoridades o en los
                  casos que, actuando de buena fe, consideramos que tal acción
                  es razonablemente necesaria para cumplir con un proceso
                  judicial; para contestar cualquier reclamación o demanda
                  jurídica; o para proteger los derechos de {nombre} o sus
                  clientes y el público en general.
                </p>
                <p>
                  {nombre} puede proporcionar tus datos personales a terceras
                  personas (Ej. proveedores de servicios de Internet que nos
                  ayudan a administrar nuestra página web o llevar a cabo los
                  servicios contratados, empresas de soporte y mantenimiento
                  informático, empresas de logística, gestorías y asesoramiento
                  fiscal y contable, etc.). En cualquier caso, estas terceras
                  personas deben mantener, en todo momento, los mismos niveles
                  de seguridad que {nombre} en relación con tus datos personales
                  y, cuando sea necesario, estarán vinculadas por compromisos
                  legales a fin de guardar tus datos personales de forma privada
                  y segura, y a fin de utilizar únicamente la información
                  siguiendo instrucciones específicas de {nombre}
                </p>
                <b>6. ¿Cuáles son sus derechos como afectados o interesado?</b>
                <p>
                  Cualquier persona tiene derecho a obtener confirmación sobre
                  si {nombre} está tratando datos personales que le conciernan,
                  o no.{" "}
                </p>
                <p>
                  En concreto, las personas interesadas pueden solicitar el
                  derecho de acceso a sus datos personales, así como recibirlos
                  en un formato común y lectura mecanizada si el tratamiento se
                  efectúa por medios electrónicos (derecho de portabilidad).
                </p>
                <p>
                  Asimismo, las personas interesadas pueden solicitar el derecho
                  de rectificación de los datos inexactos o, en su caso,
                  solicitar su supresión cuando, entre otros motivos, los datos
                  ya no sea necesarios para los fines que fueron recogidos.{" "}
                </p>
                <p>
                  Complementariamente, en determinadas circunstancias, los
                  interesados podrán solicitar la limitación del tratamiento de
                  sus datos, o en determinadas circunstancias y por motivos
                  relacionados con su situación particular, los interesados
                  podrán ejercitar su derecho a oponerse al tratamiento de sus
                  datos. {nombre} dejará de tratar los datos, salvo por motivos
                  legítimos imperiosos, o el ejercicio o la defensa de posibles
                  reclamaciones o en aquellas excepciones establecidas en la
                  normativa aplicable.
                </p>
                <p>
                  Asimismo, le informamos que tiene derecho a retirar sus
                  consentimientos otorgados en cualquier momento, sin que ello
                  afecte a la licitud del tratamiento basado en el
                  consentimiento previo a su retirada.
                </p>
                <p>
                  Así mismo se informa al Usuario que en cualquier momento puede
                  ejercitar los mencionados derechos dirigiéndose por escrito a
                  nosotros utilizando los datos de contacto que aparecen en el
                  Apartado 1, ‘Responsable de tratamiento’ de la presente
                  política de Protección de Datos y Privacidad de {nombre}{" "}
                  ,adjuntando copia de su DNI. Al igual modo, puede enviarnos un
                  correo electrónico a la dirección {email}.
                </p>
                <p>
                  También tendrá el derecho a presentar una reclamación ante la
                  Agencia Española de Protección de Datos, especialmente cuando
                  no haya obtenido satisfacción en el ejercicio de sus derechos.
                </p>
                <b>
                  Agencia Española de Protección de Datos. <br />
                  C/ Jorge Juan, 6<br />
                  28001 - Madrid
                  <br />
                  Telf. 901100099 / 912663517
                  <br />
                  7. Protección de datos de los usuarios de la página web.
                </b>
                <p>
                  De conformidad con el vigente Reglamento (UE) 2016/679,{" "}
                  {nombre} informa que los datos de carácter personal de los
                  Usuarios del sitio web se tratarán para la actividad del
                  tratamiento indicado en cada formulario de recogida de datos
                  de nuestra página web por parte de {nombre}. Dicho tratamiento
                  de sus datos estará amparado en su propio consentimiento. Al
                  pulsar el botón “ENVIAR”, el Usuario consiente al tratamiento
                  de sus datos por parte de {nombre}.
                </p>
                <p>
                  Asimismo, le informamos que salvo obligación legal o
                  consentimiento expreso por su parte {nombre} no va a ceder sus
                  datos a terceras personas.{" "}
                </p>
                <p>
                  Igualmente, se informa al Usuario que en cualquier momento
                  puede ejercitar los derechos de acceso, rectificación o
                  supresión de datos, así como disponer de otros derechos
                  reconocidos en el presente documento y regulados en el
                  Reglamento (UE) 2016/679, dirigiéndose por escrito a nosotros
                  utilizando los datos de contacto que aparecen en el Apartado
                  1, ‘Responsable de Tratamiento’.
                </p>
                <p>
                  Por otro lado, de acuerdo con lo dispuesto en la Ley 34/2002,
                  de 11 de Julio, de Servicios de la Sociedad de Información y
                  de Comercio Electrónico, {nombre} se compromete a no enviar
                  publicidad a través del correo electrónico sin haber recabado
                  antes la expresa autorización del destinatario. El Usuario
                  podrá oponerse al envío de publicidad marcando la casilla
                  correspondiente.
                </p>
                <b>
                  8. Otra información de interés sobre nuestra política de
                  privacidad
                  <br />
                  8.1 Medidas de Seguridad
                </b>
                <p>
                  {nombre} adopta los niveles de seguridad requeridos por la
                  normativa Europea y Española vigente en protección de datos
                  teniendo en cuenta el estado de la técnica, los costes de
                  aplicación y la naturaleza, el alcance, el contexto y los
                  fines del tratamiento descritos, así como los riesgos de
                  probabilidad y gravedad variables para sus derechos y
                  libertades como persona.
                </p>
                <b>8.2 Tratamiento de datos de menores</b>
                <p>
                  Al amparo del Reglamento UE 2016/679 y de la LOPDGDD 3/2018,
                  los menores de más de 14 años pueden dar su consentimiento a
                  la contratación de servicios de la sociedad de la información,
                  como puede ser la inscripción en un foro, la cumplimentación
                  de un formulario de contacto, etc. No obstante, será
                  responsabilidad de {nombre} comprobar la veracidad de la edad
                  indicada por parte del menor.
                </p>
                <p>
                  Para el tratamiento de datos de menores de 14 años dicha
                  recogida de datos se realizará siempre bajo el expreso
                  consentimiento de los padres o tutores legales.{" "}
                </p>
                <b>
                  8.3 Modificaciones de nuestra Política de Protección de Datos
                  y de Privacidad
                </b>
                <p>
                  Ocasionalmente, {nombre} podrá realizar modificaciones y
                  correcciones en este apartado de Política de Protección de
                  Datos para Clientes, Proveedores y Usuarios. Por favor,
                  verifique este apartado regularmente para consultar los
                  cambios que puedan haber existido y de qué manera le pueden
                  afectar.
                </p>
                <b>
                  8.4 ¿Por qué es necesario aceptar está Política de Protección
                  de Datos y de Privacidad?
                </b>
                <p>
                  Este apartado le proporciona de un modo fácilmente accesible
                  toda la información necesaria para que puedas conocer la
                  tipología de datos que {nombre} mantiene sobre sus usuarios,
                  clientes potenciales, clientes y/o proveedores, las
                  finalidades perseguidas, los derechos que la normativa de
                  protección de datos reconoce a Ud. como persona afectada y el
                  modo de cómo ejercer dichos derechos. Por lo tanto, con el
                  envío deliberado de sus datos personales mediante nuestros
                  medios de contacto y/o con el inicio de la relación mercantil
                  con nuestra empresa consideramos que reconoce y acepta el
                  tratamiento de tus datos personales tal y como se describe en
                  la presente política. Esta información personal solamente se
                  usará para los fines para los cuales nos la has facilitado o
                  determinadas normativas nacionales o regionales nos habilitan
                  hacerlo.{" "}
                </p>
                <p>
                  En cualquier caso, debemos advertirle que una negativa por su
                  parte para facilitarnos determinados datos solicitados podría
                  obstaculizar el desarrollo de la relación contractual entre
                  las partes con posibles consecuencias serias al momento de
                  prestar las diversas prestaciones contempladas dentro del
                  contrato mercantil celebrado con la parte contratante.
                </p>
                <p>
                  Si tienes cualquier pregunta en relación con este apartado de
                  Política de Protección de Datos para los Usuarios, Clientes
                  Potenciales, Clientes y Proveedores de {nombre}, por favor,
                  póngase en contacto con la empresa usando la dirección
                  facilitada en el Apartado 1, ‘Responsable de Tratamiento’ y
                  estaremos encantados de atenderte y dar respuesta a las
                  cuestiones adicionales que nos quieras plantear.
                </p>
                <b>9. Legislación aplicable</b>
                <p>
                  Las presente Política de Protección de Datos se regirá en todo
                  momento por lo dispuesto en la legislación española y europea
                  en materia de protección de datos de carácter personal y de
                  privacidad.
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
              width: 100%;
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
            .tg .tg-hmp3 {
              background-color: #d2e4fc;
              text-align: left;
              vertical-align: top;
            }
            .tg.tg-0lax {
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
