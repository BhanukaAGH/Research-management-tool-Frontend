import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useSnackbar } from "notistack";

const SendFeedBack = (props) => {
  console.log(props);
  const popModel = () => {
    props.emailModel();
  };

  const { enqueueSnackbar } = useSnackbar();

  const {
    user: { name: panelMemberName, email: panelMemberEmail },
  } = useSelector((state) => state.user);

  const studentEmail = props.mail;
  const studentRegNo = props.reg;

  const initialState = {
    subject: "",
    Registration_Number: studentRegNo,
    To_whom: studentEmail,
    input_message: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const memberName = panelMemberName;
    const memberEmail = panelMemberEmail;
    const StudentName = props.StudentName;

    setValues({
      ...values,
      [name]: value,
      memberName,
      memberEmail,
      StudentName,
    });
  };

  const controlInput = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = async () => {
    try {
      props.setLoading(true);
      popModel();
      const res = await axios.post(
        `${process.env.SERVER_BACKEND_URL}/api/v1/panel/sendFeedback`,
        values
      );
      props.setLoading(false);
      console.log(res);

      enqueueSnackbar("Email send Successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      // setLoading(true);
    }
  };

  return (
    <article className="absolute inset-0 flex items-center justify-center bg-black  bg-opacity-50 ">
      <div className="rounded-lg bg-gray-200 py-4 px-6">
        <div className="flex items-center justify-between border-b-4 border-indigo-500 pb-5">
          <h3>Send Email To Student</h3>
          <AiOutlineClose onClick={popModel} className="text-red-600" />
        </div>
        <form onSubmit={controlInput} className="py-6 px-6">
          <div>
            <label
              htmlFor="Subject"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="Subject"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              Registration Number
            </label>
            <input
              type="text"
              name="Registration_Number"
              className="w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg"
              defaultValue={values.Registration_Number}
              onChange={handleChange}
            />
          </div>

          <div className="mt-2">
            <label
              htmlFor=" To"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              To
            </label>
            <input
              type="email"
              name="To_whom"
              className="w-96 rounded-lg border border-gray-400 px-4 py-2 text-lg"
              onChange={handleChange}
              defaultValue={values.To_whom}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=" Message"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="input_message"
              cols="40"
              className="mb-2 block rounded-lg border border-gray-400 text-lg font-medium text-gray-700"
              rows="5"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mt-3 flex justify-center">
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
