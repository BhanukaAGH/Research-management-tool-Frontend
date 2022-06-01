import React from "react";
import { useState } from "react";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import TopicInfo from "./TopicInfo";

const AcceptTopic = ({ topicName, researchArea, createdAt, studentId }) => {
  const studentEmail = studentId.email;
  const regNumber = studentId.regNo;
  const topicInformation = {
    researchArea,
    createdAt,
    topicName,
    studentEmail,
    regNumber,
  };
  const [show, setShow] = useState(false);

  return (
    <article className="bg-stone-50 rounded-md border-black border-1 p-7 mb-3 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-text-gray-300">Topic Name: {topicName}</h1>
        <button onClick={() => setShow(!show)}>
          {show ? <FaRegArrowAltCircleUp /> : <FaRegArrowAltCircleDown />}
        </button>
      </div>
      <hr className="bg-red-400" />
      {show && <TopicInfo {...topicInformation} />}
    </article>
  );
};

export default AcceptTopic;
