// Type declarations in TypeScript allow us to specify the type of variables, function parameters, return values, objects, arrays, and more. This helps ensure type safety and better code maintainability.

import axios from "axios";


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


fetchPosts().then((posts) => {
  console.log("Fetched Posts:", posts.slice(0, 5)); 
});
