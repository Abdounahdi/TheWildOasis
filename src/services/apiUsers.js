import supabase from "./supaBase";

export async function createUserApi(newUser) {
  let { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        full_name: newUser.fullName,
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("User Could not be created");
  }

  return { data, error };
}

export async function loginUserApi(obj) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: obj.email,
    password: obj.password,
  });

  if (error) {
    console.error(error);
    throw new Error("User is not Valid");
  }

  console.log(data)

  return { data, error };
}
