import React from "react";
import { useState, useEffect } from "react";
import PopModel from "./PopModel";
import SendFeedBack from "./SendFeedBack";
import axios from "axios";

const TopicInfo = ({
  topicName,
  researchArea,
  createdAt,
  studentEmail,
  regNumber,
}) => {
  const [showbtn, setShowbtn] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [btnValue, setBtnValue] = useState("");
  const [status, setStatus] = useState("Pending");
  const [approvedDate, setApprovedDate] = useState("");
  const [ischeck, setIscheck] = useState(false);
  var date = new Date(createdAt);
  var dateApproved = new Date(approvedDate);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/panel/getTopicStatus/${topicName}`)
      .then((response) => {
        const {
          data: { topicStus },
        } = response;

        if (typeof topicStus.topicStatus === "null") {
          return setStatus("Pending");
        } else {
          setStatus(topicStus.topicStatus);
          setApprovedDate(topicStus.dateAppordeOrReject);
          setIscheck(true);
        }
      });
  });

  const sendDate = async () => {
    const allDate = {
      topicName: topicName,
      studentMail: studentEmail,
      topicStatus: btnValue,
    };
    const response = await axios.post(
      "http://localhost:5000/api/v1/panel/topicAcceptOrReject",
      allDate
    );
  };

  const pop = () => {
    setShowbtn(!showbtn);
  };

  const passValue = (name) => {
    setBtnValue(name);
    setShowbtn(!showbtn);
  };

  const showEmailModel = () => {
    setShowEmail(!showEmail);
  };

  const closeEmail = () => {
    setShowEmail(!showEmail);
  };

  return (
    <div>
      {showbtn ? (
        <PopModel model={pop} name={btnValue} send={sendDate} />
      ) : null}

      {showEmail ? (
        <SendFeedBack
          emailModel={closeEmail}
          mail={studentEmail}
          reg={regNumber}
        />
      ) : null}
      <div className="flex items-center justify-between mb-4 mt-3">
        <p className="text-lg ">Research Area:{researchArea}</p>
        <p className="text-lg ">Student Email:{studentEmail}</p>
      </div>
      <p className="text-lg">Submited At: {date.toDateString()}</p>
      <p className="text-lg">Panel Member Approval: {status}</p>
      {ischeck ? (
        <p className="text-lg">
          Panel member {status} At:{dateApproved.toDateString()}{" "}
        </p>
      ) : null}

      <div className="flex items-center justify-between  mt-3">
        <button
          type="submit"
          className="topic-btn bg-green-500  hover:bg-green-700"
          onClick={() => passValue("Accept")}
        >
          Accept
        </button>

        <button
          type="submit"
          className="topic-btn bg-red-600    hover:bg-red-700 "
          onClick={() => passValue("Reject")}
        >
          Reject
        </button>

        <button
          type="submit"
          className="topic-btn bg-yellow-400    hover:bg-yellow-600 "
          onClick={showEmailModel}
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default TopicInfo;
