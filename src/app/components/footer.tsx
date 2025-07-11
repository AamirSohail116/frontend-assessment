import Logo from "./logo";

const Footer = () => {
  return (
    <div className=" fixed bottom-0 w-full  p-4 border-t bg-slate-100">
      <div className=" md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className=" space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <button className=" text-gray-700">Privacy Policy</button>
          <button className=" text-gray-700">Terms of service</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
