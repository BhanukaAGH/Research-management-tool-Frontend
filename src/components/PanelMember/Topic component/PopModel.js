import React from "react";
const PopModel = (props) => {
  const chechkModel = () => {
    props.model();
  };

  const chechkModelandSendData = () => {
    props.model();
    props.send();
    props.fetchPanelTopic();
    console.log("From closed model");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
      <div className="rounded-lg bg-gray-200 py-4 px-6 ">
        <h1 className="text-xl font-bold">
          Do You Want to {props.name} this topic ?
        </h1>
        <p className="mt-2 text-lg">
          Please make sure to make the correct decision
        </p>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="submit"
            className="topic-btn bg-red-600  "
            onClick={chechkModel}
          >
            Close
          </button>
          <button
            type="submit"
            className="topic-btn bg-green-500  hover:bg-green-700 "
            onClick={chechkModelandSendData}
          >
            {props.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopModel;
