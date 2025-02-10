import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreateUser } from "./useCreateUser";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: {},
  });

  const { errors } = formState;
  const { isCreating, createUser } = useCreateUser();

  function onSubmit(newObj) {
    createUser(newObj, {
      onSuccess: () => reset(),
    });
  }

  function onError(error) {
    console.error(error);
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords need to match",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isCreating ? `Creating user ...` : "Create new user"}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
