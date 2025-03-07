import supabase, { supabaseUrl } from "./supaBase";

export async function getCabins(filter, sortBy) {
  let query = supabase.from("cabins").select();
  if (filter !== "all") {
    query[filter === "withDiscount" ? "gt" : "eq"]("discount", 0);
  }

  if (sortBy) {
    const [sortColumn, sortOrder] = sortBy.split("-");
    query.order(sortColumn, { ascending: sortOrder === "asc" });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }

  return data;
}

// export async function getCabinNameById(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("name")
//     .eq("id", id);
//   if (error) {
//     console.error(error);
//     throw new Error(`Cabin with the id of ${id} could not be loaded `);
//   }
//   return data;
// }

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-img//${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabin Could not be Created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-img")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { error: deleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);
    console.error(storageError, deleteError);
    throw new Error(
      "Cabin image was not uploaded and cabin was not created ! "
    );
  }

  return data;
}
