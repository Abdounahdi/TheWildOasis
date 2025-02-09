import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";

import { useLoginUser } from "./useLoginUser";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { getValues, register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();

  const { isLogging, loginUser } = useLoginUser();

  const { errors } = formState;

  function onSumbit(obj) {
    loginUser(obj, { onSuccess: () => navigate("/") });
  }

  function onError(error) {
    console.error(errors);
    console.error(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSumbit, onError)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLogging}
          {...register("email", { required: "This Field is Required" })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLogging}
          {...register("password", { required: "This Field is Required" })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
