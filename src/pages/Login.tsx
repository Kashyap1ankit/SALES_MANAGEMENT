import SiginForm from "../components/login";
import Lottie from "lottie-react";
import SigninAni from "../../public/animations/signin.json";
import Loader from "../../public/animations/loader.json";
import { useEffect, useState } from "react";
import ModeButton from "../components/modebtn";

export default function Login() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Lottie
          animationData={Loader}
          className="sm:size-72 md:size-80 xl:size-96"
        />
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden dark:bg-bgDarkPrimary">
      <ModeButton />

      <div className="mt-12 lg:flex lg:justify-between lg:items-center z-10">
        <Lottie
          animationData={SigninAni}
          className="xsm:w-full xsm:size-60 mx-auto sm:size-72 md:size-80 xl:size-96 lg:w-1/2 "
        />
        <SiginForm />
      </div>
    </div>
  );
}
