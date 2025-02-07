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
    throw new Error("Bookings Could not be loaded");
  }

  return { data, error };
}
