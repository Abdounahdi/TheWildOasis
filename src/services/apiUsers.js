import supabase, { supabaseUrl } from "./supaBase";

export async function createUserApi(newUser) {
  let { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        full_name: newUser.fullName,
        image:
          "https://ohjawgkwuomwckdojjgb.supabase.co/storage/v1/object/public/avatars//avatar-icon0002_750950-43.avif",
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

  console.log(data);

  return { data, error };
}

export async function logOutUserApi(obj) {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("User is not Valid");
  }
}

export async function updateUserApi({
  avatar: avatarIsAdded = false,
  ...remained
}) {
  const { newUser } = remained; 

  const imageName = avatarIsAdded
    ? `${Math.random()}-${newUser.user_metadata.image.name}`.replaceAll("/", "")
    : "";
  const imagePath = avatarIsAdded
    ? `${supabaseUrl}/storage/v1/object/public/avatars//${imageName}`
    : newUser.user_metadata.image;


  const { data, error } = await supabase.auth.updateUser({
    data: {
      image: imagePath,
      full_name: newUser.user_metadata.full_name,
    },
  });

  if (error) throw new Error("user could not be updated ");

  if (avatarIsAdded) {
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(imageName, newUser.user_metadata.image);

    if (storageError) throw new Error("your picture could not be loaded ");
  }

  
  return data;
}