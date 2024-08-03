import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";
import "react-quill/dist/quill.snow.css";

export default function CreatePostPage() {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const { userInfo } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files && files[0]) {
      data.set("file", files[0]);
    }

    console.log("Sending data to API endpoint:", apiEndpoint);

    try {
      const response = await fetch(`${apiEndpoint}/post`, {
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userInfo?.token}`, // Добавляем токен авторизации
        },
      });

      if (response.ok) {
        console.log("Post created successfully");
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
}
