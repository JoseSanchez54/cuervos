const Footer = ({ options }) => {
  const menuBruto = Object.values(options.menu_footer).map((key) => {
    return key;
  });
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">{menuBruto.map((e) => {})}</div>
      </div>
    </div>
  );
};
export default Footer;
