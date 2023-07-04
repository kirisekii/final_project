import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Questions from "../Questions/Questions";
import Replies from "../Replies/Replies";

const Home = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };
  return (
    <>
      <Nav />
      <Questions />
      <Replies />
      {/* <main className="main">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>
      </main> */}
    </>
  );
};

export default Home;
