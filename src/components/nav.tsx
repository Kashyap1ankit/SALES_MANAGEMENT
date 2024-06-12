import ModeButton from "./modebtn";
import Title from "./title";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-screen flex justify-between px-2 py-4 bg-gray300 dark:bg-bgDarkPrimary items-center dark:border-b-2 dark:border-slate500 z-50">
      <Title
        text="AgSpert"
        className="font-Lato font-bold tracking-wider xl:text-2xl dark:text-white"
        onClick={() => navigate("/")}
      />

      <ModeButton />
    </div>
  );
}
