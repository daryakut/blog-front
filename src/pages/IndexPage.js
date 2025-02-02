import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    fetch(`${apiEndpoint}/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
        console.log(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
