import { createClient } from "@supabase/supabase-js";

let supabase

if (supabase == null) {
  supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

const databaseCallList = {
  genericInsert,
  genericGetById,
  signUpEP,
  signInEP,
  signInGH,
  signUpTP,
  likePost,
  unlikePost,
  getLoggedIn,
  checkUsers,
  logOff,
  getFromStorage,
  getLatest,
  getPosts,
  getComments,
  getLikes,
  getChillspots,
  addPost,
  uploadFile,
  getUser
}

async function getComments(postID) {
  const { data, error } = await supabase.from("comments")
    .select(`
      comment,
      Users(username)
    `)
    .eq('post_id', postID)

  if (error) {
    console.error(error)
    return
  }

  return data;
}

async function getChillspots() {
  const { data, error } = await supabase.from("chillspots")
    .select(`
    LngLat,
    title,
    description,
    Users (username)
    `)

  if (data.length < 1) {
    console.error("no chillspots")
  } else {
    return data;
  }
}

async function signUpTP(user, username) {
  await genericInsert("Users", [
    {
      UserID: user.id,
      username: username
    }
  ]);
}

async function checkUsers(userID) {
  const { data, error } = await supabase.from("Users")
    .select("username")
    .eq("UserID", userID)

  if (data.length < 1) {
    return false;
  } else {
    return true;
  }
}

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();

  return user;
}

async function getLoggedIn() {
  const user = await getUser();

  if (user) {
    return true;
  } else {
    return false;
  }
}

async function logOff() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
}

async function signInEP(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function signInGH() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `http://localhost:5173/tpsignup`,
    },
  })

  if (error) {
    console.error(error);
    return;
  }
}

async function signUpEP(uEmail, uPassword, username) {
  const { data, error } = await supabase.auth.signUp({
    email: uEmail,
    password: uPassword,
    username: username,
    options: {
      emailRedirectTo: 'https://localhost:5173/',
    },
  })

  if (error) {
    console.error(error);
    return;
  }

  genericInsert("Users", [
    {
      UserID: data.user.id,
      username: username
    }
  ])

  return data;
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

async function getLikes(postID) {
  const { data, error } = await supabase.from("posts")
    .select('likes')
    .eq('postID', postID)

  if (error) {
    console.error(error);
    return;
  }

  return data[0]
}

async function likePost(postID) {
  const likes = await getLikes(postID);

  let newLikes;

  console.log(likes.likes);

  if (likes.likes == undefined) {
    newLikes = 1;
  } else {
    newLikes = likes.likes + 1;
  }

  const { error } = await supabase.from('posts')
    .update({ likes: newLikes })
    .eq("postID", postID)

  console.log(newLikes);

  if (error) {
    console.error(error)
  } else {
    return "success"
  }
}

async function unlikePost(postID) {
  const likes = await getLikes(postID);

  let newLikes = likes.likes - 1;

  const { error } = await supabase.from('posts')
    .update({ likes: newLikes })
    .eq("postID", postID)

  if (error) {
    console.error(error)
  } else {
    return "success"
  }
}

async function getPosts() {
  const { data, error } = await supabase.from("posts").select(`
    postID,
    title,
    description,
    Images (bucket, path),
    posted_on,
    Users (UserID, username)
  `);

  if (error) {
    console.error(error);
    return;
  }
  console.log(data)
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
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}

async function genericGetById(table, idfield, id) {
  const { data, error } = await supabase.from(table)
    .select()
    .eq(idfield, id)

  if (error) {
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

async function addPost(title, description, user) {
  const error = await supabase.from('posts')
    .insert(
      [
        {
          title: title,
          description: description,
          userID: user.user.id
        }
      ]
    )

  if (error) {
    console.error(error)
    return
  }
}

export default databaseCallList