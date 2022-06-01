import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import emailjs from "@emailjs/browser";

const SendFeedBack = (props) => {
  const form = useRef();
  const popModel = () => {
    props.emailModel();
  };

  const controlInput = (e) => {
    e.preventDefault();
    // popModel();
    emailjs
      .sendForm(
        "service_kkewfbi",
        "template_5b5jqrp",
        form.current,
        "XuzjOjIjQrqnYmYga"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="bg-black bg-opacity-50 absolute inset-0 flex justify-center  items-center ">
      <div className="bg-gray-200 py-4 px-6 rounded-lg">
        <div className="flex items-center justify-between border-b-4 border-indigo-500 pb-5">
          <h3>Send Email To Student</h3>
          <AiOutlineClose onClick={popModel} className="text-red-600" />
        </div>
        <form ref={form} onSubmit={controlInput} className="py-6 px-6">
          <div>
            <label
              htmlFor="Subject"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="px-4 py-2 rounded-lg text-lg border border-gray-400 w-96"
            />
          </div>
          <div>
            <label
              htmlFor="Subject"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Registration Number
            </label>
            <input
              type="text"
              name="Registration_Number"
              className="px-4 py-2 rounded-lg text-lg border border-gray-400 w-96"
            />
          </div>

          <div className="mt-2">
            <label
              htmlFor=" To"
              className="block text-lg mb-2 font-medium text-gray-700"
            >
              To
            </label>
            <input
              type="email"
              name="To_whom"
              className="px-4 py-2 rounded-lg text-lg border border-gray-400 w-96"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=" Message"
              className="block text-lg mb-2 font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="input_message"
              cols="40"
              className="block text-lg mb-2 rounded-lg font-medium text-gray-700 border border-gray-400"
              rows="5"
            ></textarea>
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              value="Send"
              className="topic-btn bg-blue-600 text-center"
            >
              Send FeedBack
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default SendFeedBack;
