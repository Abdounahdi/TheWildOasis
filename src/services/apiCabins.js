import supabase from "./supaBase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins Could not be loaded");
  }

  return data;
}
