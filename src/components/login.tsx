import Background from "./bg";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  AbsoluteCenter,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  ViewIcon,
  ViewOffIcon,
  UnlockIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { schema } from "../schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import Title from "./title";
import Google from "../../public/svg/google.svg";
import Facebook from "../../public/svg/facebook.svg";

type InputTypes = z.infer<typeof schema>;

export default function SiginForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [useDefault, setUseDefault] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InputTypes>({
    resolver: zodResolver(schema),
  });

  const handleClick = () => setShow(!show);

  function handleDemo() {
    //Initially false is set and if users click use demo then it will be set
    if (!useDefault) {
      setValue("username", import.meta.env.VITE_DEMO_USER);
      setValue("password", import.meta.env.VITE_DEMO_USER_PASS);
    } else {
      setValue("username", "");
      setValue("password", "");
    }
  }

  const onSubmit: SubmitHandler<InputTypes> = (data: InputTypes) => {
    setSubmitting(true);
    setTimeout(() => {
      if (
        data.username === import.meta.env.VITE_DEMO_USER &&
        data.password === import.meta.env.VITE_DEMO_USER_PASS
      ) {
        return navigate("/dashboard");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          navigate("/");
        }, 3000);
      }
      setSubmitting(false);
      reset();
    }, 5000);
  };
  return (
    <div className="lg:w-1/2 h-full">
      <Background />

      {error ? <Toast message="User doesn't exist" /> : ""}

      <div className="xsm:w-full md:w-3/4 lg:w-11/12 xl:w-1/2 bg-white dark:bg-bgDarkPrimary mx-auto p-8 dark:border-white border-b-2 border-r-2 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field  */}

          <div>
            <label className="mb-6 dark:text-white font-Lato font-bold">
              Username
            </label>

            <InputGroup>
              <InputLeftElement
                className="xsm:mt-2 md:mt-4"
                pointerEvents="none"
              >
                <AtSignIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter Username"
                {...register("username")}
                className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
              />
            </InputGroup>

            <p className="text-red font-bold mb-4 " role="alert">
              {errors.username?.message}
            </p>
          </div>

          {/* Password Field  */}

          <div>
            <label className="mb-6 dark:text-white font-Lato font-bold">
              Password
            </label>
            <InputGroup size="md">
              <InputLeftElement
                className="xsm:mt-2 md:mt-4"
                pointerEvents="none"
              >
                <UnlockIcon color="gray.300" />
              </InputLeftElement>

              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password")}
                className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
              />
              <InputRightElement width="4.5rem" className="xsm:mt-2 md:mt-4">
                <Button h="2rem" size="sm" onClick={handleClick}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <p className="text-red font-bold" role="alert">
              {errors.password?.message}
            </p>
          </div>

          {/* Submit Button Field  */}

          {isSubmitting ? (
            <Button
              isLoading
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              className="w-full mt-6"
            />
          ) : (
            <Button colorScheme="green" type="submit" className="w-full mt-6">
              Submit
            </Button>
          )}

          {/* Demo Button  */}

          <div
            onClick={() => {
              setUseDefault((prev) => !prev);
              handleDemo();
            }}
          >
            <p className="text-gray500 dark:text-white text-center mt-6 cursor-pointer hover:text-link font-bold">
              {useDefault ? "Don't Use Demo Details" : " Use Demo Details"}
            </p>
          </div>
        </form>

        {/* Third Party Auth */}

        <div className="mt-4 mx-auto">
          {/* Divider  */}

          <Box position="relative" padding="5">
            <Divider />
            <AbsoluteCenter
              bg="white"
              px="0"
              className="dark:bg-bgDarkPrimary dark:text-gray300"
            >
              <p className="opacity-50">Or Login With</p>
            </AbsoluteCenter>
          </Box>

          {/* Google  */}

          <div className="text-center mt-6">
            <Button className=" items-center w-full py-4">
              <img src={Google} />
              <Title text="Login with Google" className="ml-4 text-slate500" />
            </Button>
          </div>

          {/* FaceBook  */}

          <div className="text-center mt-6">
            <Button className=" items-center w-full py-4">
              <img src={Facebook} />
              <Title
                text="Login with Facebook"
                className="ml-4 text-slate500"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
