import * as React from "react";
import { useState, useEffect } from "react";
import AcceptTopic from "./AcceptTopic";
import axios from "axios";

const AcceptTopics = () => {
  const [topics, setTopics] = useState([]);
  const fetchTopics = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/panel/getAcceptTopics"
    );
    const {
      data: { acceptTopics },
    } = response;
    setTopics(acceptTopics);
  };
  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <main>
      <h2 className="text-center mb-4">List Of Topics</h2>
      {topics.map((topic) => {
        return <AcceptTopic key={topic._id} {...topic} />;
      })}
    </main>
  );
};

export default AcceptTopics;
