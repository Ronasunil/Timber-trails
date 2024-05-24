import supabase from "./supabase";
import { SUPABASE_URL } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Can't load cabins`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Can't delete item`);
  }

  return data;
}

export async function CreateCabin(cabinData) {
  const hasImagePath =
    typeof cabinData.cabinImage === "string"
      ? cabinData.cabinImage.startsWith(SUPABASE_URL)
      : false;

  const cabinImageName = `${Math.random()}-${
    cabinData.cabinImage.name
  }`.replaceAll("/", "");

  const cabinImagePath = hasImagePath
    ? cabinData.cabinImage
    : `${SUPABASE_URL}/storage/v1/object/public/cabinImages/${cabinImageName}`;

  // query for updation and creation
  let query = supabase.from("cabins");

  // for creating new cabin
  if (!cabinData.id) {
    query = query.insert([
      {
        ...cabinData,
        cabinImage: cabinData.cabinImage
          ? cabinData.cabinImage
          : cabinImagePath,
      },
    ]);
  }

  // for editing a cabin
  if (cabinData.id) {
    query = query
      .update({ ...cabinData, cabinImage: cabinImagePath })
      .eq("id", cabinData.id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error.message);
    throw new Error(`Can't create a cabin`);
  }

  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(cabinImageName, cabinData.cabinImage);

  if (storageError) {
    console.log(storageError);
    throw new Error(`Can't upload image`);
  }

  return data;
}
