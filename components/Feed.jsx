"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p) => (
        <PromptCard key={p._id} post={p} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      // If search text is empty, display all posts
      setFilteredPosts(posts);
    } else {
      // Filter posts based on search text
      const filtered = posts.filter((post) => {
        const promptMatch = post.prompt
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const tagMatch = post.tag
          .toLowerCase()
          .includes(searchText.toLowerCase());

        const creatorNmae = post.creator.username;
        const creatorMatch = creatorNmae.includes(searchText.toLowerCase());
        return promptMatch || tagMatch || creatorMatch;
      });
      setFilteredPosts(filtered);
    }
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
