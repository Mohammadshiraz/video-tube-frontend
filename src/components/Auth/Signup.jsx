import React from "react";
import { Logo, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../../skeleton/loginSkeleton.jsx";
import GetImagePreview from "../Utils/GetImagePreview.jsx";
import { motion } from "framer-motion";
import { slideIn } from "../Utils/motion";

function SignUp() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    try {
      const response = await dispatch(createAccount(data));
      navigate("/login");
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <>
      <motion.div
        variants={slideIn("left", "spring", "0", "1")}
        initial="hidden"
        animate="show"
        className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8"
      >
        <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 p-2 text-sm sm:w-96 w-full"
          >
            <div className="w-full relative h-28 bg-[#222222]">
              <div className="w-full h-full">
                <GetImagePreview
                  name="coverImage"
                  control={control}
                  className="w-full h-28 object-cover border-none border-slate-900"
                  cameraIcon
                />
                <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                  cover Image
                </div>
              </div>
              <div className="absolute left-2 bottom-2 rounded-full border-2">
                <GetImagePreview
                  name="avatar"
                  control={control}
                  className="object-cover rounded-full h-20 w-20 outline-none"
                  cameraIcon={true}
                  cameraSize={20}
                />
              </div>
            </div>
            {errors.avatar && (
              <div className="text-red-500">{errors.avatar.message}</div>
            )}
            <Input
              label="Username: "
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "username is required",
              })}
              className="h-8"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Email: "
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "email is required",
              })}
              className="h-8"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <Input
              label="Fullname: "
              type="text"
              placeholder="Enter fullname"
              {...register("fullName", {
                required: "fullName is required",
              })}
              className="h-8"
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "password is required",
              })}
              className="h-8"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Signup
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default SignUp;
