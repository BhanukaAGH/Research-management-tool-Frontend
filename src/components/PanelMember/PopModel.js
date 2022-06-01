import React from "react";
const PopModel = (props) => {
  const chechkModel = () => {
    props.model();
  };

  const chechkModelandSendData = () => {
    props.model();
    props.send();
  };

  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center  ">
      <div className="bg-gray-200 py-4 px-6 rounded-lg ">
        <h1 className="text-xl font-bold">Do You Want to {props.name}</h1>
        <p className="mt-2 text-lg">
          Please make sure to make the correct desicion
        </p>
        <div className="flex justify-between items-center mt-3">
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
