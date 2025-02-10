import { useContext, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { authContext } from "./authContext";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  // const {
  //   user: {
  //     email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useUser();

  const userContext = useContext(authContext);
  const email = userContext.user.user_metadata?.email;
  const currentFullName = userContext.user.user_metadata?.full_name;
  const signIn = userContext.signIn;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { isUpdating, updateUser } = useUpdateUser();

  async function handleSubmit(e) {
    e.preventDefault();
    let newUser = {
      ...userContext.user,
      user_metadata: {
        ...userContext.user.user_metadata,
        full_name: fullName,
        image: avatar || userContext.user.user_metadata.image,
      },
    };
    const data = await updateUser({ newUser, avatar });
    signIn(data.user);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating ... " : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
