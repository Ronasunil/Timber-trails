import supabase from "./supabase";

export async function signup({ email, password, fullname }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullname, avatar: "" } },
  });

  if (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Invalid email or password");
  }

  return data;
}

export async function getCurrentUser() {
  // prettier-ignore
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullname, avatar, password }) {
  let updateObj = {};

  // updating fullname and avatar

  if (fullname) updateObj = { data: { fullname } };

  if (password) updateObj = { ...updateObj, password };

  // updating password
  const { data, error } = await supabase.auth.updateUser(updateObj);

  if (error) throw new Error(error);

  if (!avatar) return data;

  // if avatar exists
  const avatarName = `avatar-${Math.random()}-${data.user.id}`;

  // update object
  updateObj = {
    data: {
      avatar: `  https://qozrqyobcxjewzwxrsvy.supabase.co/storage/v1/object/public/avatars/${avatarName}`,
    },
  };

  console.log(avatarName, updateObj, avatar);
  // storing to avatar bucket
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) {
    console.log(storageError);
    throw new Error(storageError);
  }

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
    updateObj
  );

  if (error2) {
    console.log(error2);
    throw new Error(error2);
  }

  return updatedUser;
}
