import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee } from "../state/auth/authAction";

export let useAuth = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = (data) => {
    console.log(data);
  };

  const onLoginSubmit = (data) => {
    dispatch(loginEmployee(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    onRegisterSubmit,
    onLoginSubmit,
    navigate,
  };
};
