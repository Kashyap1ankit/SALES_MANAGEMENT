import Background from "../components/bg";
import ModeButton from "../components/modebtn";
import ActiveTableComp from "../components/activetable";
import CompletedTableComp from "../components/completedtab";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import AddModal from "../components/modal";

import sample from "../lib/sample.json";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../../public/animations/loader.json";

export default function Dashboard() {
  const [allData, setData] = useState(sample);
  const [activeTabStatus, setActiveTabStatus] = useState(true);
  const [_, setCompletedTabStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (localStorage.getItem("logged") !== "true") {
        navigate("/");
      }
      setLoading(false);
    }, 3000);
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
    <div>
      <Background />
      <ModeButton />
      <div className="mt-36">
        <div className="mx-8">
          {/* Toggler Button  */}
          <div className="md:flex md:justify-between">
            <div className="flex rounded-md xsm:w-full md:w-11/12 ">
              <Button
                className=" w-1/2"
                borderRadius={"1%"}
                onClick={() => {
                  setActiveTabStatus(true);
                  setCompletedTabStatus(false);
                }}
                colorScheme={activeTabStatus ? "teal" : "gray"}
              >
                Active
              </Button>
              <Button
                borderRadius={"1%"}
                className="w-1/2"
                onClick={() => {
                  setCompletedTabStatus(true);
                  setActiveTabStatus(false);
                }}
                colorScheme={activeTabStatus ? "gray" : "teal"}
              >
                Completed
              </Button>
            </div>
            <div className="xsm:mt-4 md:ml-4 md:mt-0 xsm:w-full md:w-fit">
              <AddModal setData={setData} />
            </div>
          </div>

          {/* Table Showing  */}
          <div className="mt-12">
            {activeTabStatus ? (
              <ActiveTableComp data={allData} setData={setData} />
            ) : (
              <CompletedTableComp data={allData} setData={setData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
