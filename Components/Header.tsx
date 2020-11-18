import Head from "next/head";

const Header = (): JSX.Element => {
  return (
    <div className="bg-gray-800">
      <Head>
        <h1 className="text-2xl text-center text-blue-600">DeafStudy</h1>
        <meta name="viewport" content="initial-scale=1.0, width=device.width" />
      </Head>
    </div>
  );
};

export default Header;
