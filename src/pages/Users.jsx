import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

// function NewUsers() {
//   return <Heading as="h1">Create a new user</Heading>;
// }

// export default NewUsers;
function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default Users;
