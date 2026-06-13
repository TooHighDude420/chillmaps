import { createClient } from "@supabase/supabase-js";

let supabase

if (supabase == null) {
  supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

const databaseCallList = {
  genericInsert,
  genericGetById,
  getFromStorage,
  getLatest,
  getPosts,
  addPost,
  uploadFile
}

async function uploadFile(filepath, file) {
  const { data, error } = await supabase.storage
    .from('Media')
    .upload(filepath, file);

  if (error) {
    console.log(error);
    return;
  }

  return data;
}

async function getPosts() {
  const { data, error } = await supabase.from("posts").select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function getLatest(table) {
  const { data, error } = await supabase.from(table)
    .select()
    .order('ImageID', { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function getFromStorage(bucket, path) {
  const {data} = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}

async function genericGetById(table, idfield, id) {
  const { data, error } = await supabase.from(table)
  .select()
  .eq(idfield, id)

  if (error){
    console.error(error);
  }

  return data
}


async function genericInsert(table, value) {
  const { data, error } = await supabase.from(table)
    .insert(value);

  if (error) {
    console.error(error);
  }

  return data;
}

async function addPost(title, description) {
  const error = await supabase.from('posts')
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