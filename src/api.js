import { createClient } from "@supabase/supabase-js";

let supabase

if (supabase == null) {
  supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

const databaseCallList = {
  read: getPosts,
  create: addPost
}

async function getPosts() {
  const { data, error } = await supabase.from("posts").select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function addPost(title, description) {
  const { data, error } = await supabase.from('posts')
    .insert(
      [
        {
          title: title,
          description: description
        }
      ]
    )

  if (error) {
    console.error(error)
    return
  }
}

export default databaseCallList