import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { confirm } from "react-confirm-box";

const Allocate = ({ setAllocate, groupID }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [group, setGroup] = useState([]); //set group details of seected group
  const [panel, setPanel] = useState([]); //store panel details
  const [allocated, setAllocated] = useState([]); //Alocated panel members
  const [number, setNumber] = useState(""); //Alocated panel members

  //get group details
  const tableList = async () => {
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/student/getgroups/${groupID}`;
    await axios.get(url).then((json) => {
      setGroup(json.data);
      setAllocated(json.data.Panelmember);
      setNumber(json.data.Panelmember.length);
    });
  };

  //get list of panel members
  const panelList = async () => {
    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/users/findby/panel_member`;
    await axios.get(url).then((json) => setPanel(json.data));
  };

  useEffect(() => {
    tableList();
    panelList();
  }, []);

  async function allocate(un, ID) {
    // console.log("works",un,groupID)
    const found = allocated.some((el) => el.MemberID === ID);
    if (found) {
      enqueueSnackbar('This Member is Already Allocated"', { variant: "info" });
      return;
    }

    const url = `${process.env.SERVER_BACKEND_URL}/api/v1/student/update/${groupID}`;

    const res = await axios
      .patch(url, {
        Name: un,
        MemberID: ID,
      })
      .then(function (response) {
        console.log("response", response);
        enqueueSnackbar(response.data.msg, { variant: "success" });
        tableList();
      })
      .catch(function (error) {
        console.log("error", error);
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      });
  }

  async function Unallocate() {
    const result = await confirm("Un-Allocate All Panel Members");
    if (result) {
      const url = `${process.env.SERVER_BACKEND_URL}/api/v1/student/unallocate/${groupID}`;
      const res = await axios
        .patch(url)
        .then(function (response) {
          console.log("response", response);
          enqueueSnackbar(response.data.msg, { variant: "success" });
          tableList();
        })
        .catch(function (error) {
          console.log("error", error);
          enqueueSnackbar(error.response.data.msg, { variant: "error" });
        });
    } else {
      enqueueSnackbar("No Change", { variant: "info" });
    }
  }

  const renderTable = () => {
    return panel.map((user, index) => {
      //display details
      return (
        <tr className="border-b bg-white" key={index}>
          <td className="border px-6 py-4">{user.name}</td>
          <td className="border px-6 py-4">
            <button
              type="button"
              onClick={() => {
                allocate(user.name, user._id);
              }}
              className="mr-2 mb-2 rounded-lg  bg-[#e2a500] px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            >
              Allocate
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="h-full w-full overflow-auto p-5  ">
      <div className="mb-4 text-base">
        <div
          className="flex max-w-fit cursor-pointer items-center space-x-2 rounded-md bg-gray-700 px-4 py-1 text-slate-50 duration-500 hover:scale-105 hover:shadow-lg hover:shadow-gray-600"
          onClick={() => setAllocate(false)}
        >
          <span>Back</span>
        </div>
        <br />
        <div className="justify-left flex items-center">
          <button
            className="mr-2 bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 hover:bg-red-200  dark:bg-red-200 dark:text-red-800 dark:hover:bg-red-300"
            onClick={Unallocate}
          >
            Un-Alllocate
          </button>
        </div>
        <div className="mb-4 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Allocate Panelmembers
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Group Details
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Group ID:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {group.groupID}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Current Allocated
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {number}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Allocated List
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul class="w-48 rounded-lg bg-white text-sm font-medium  text-gray-900 ">
                    {allocated.map((item, index) => (
                      <li class="w-full rounded-t-lg border-b px-4 py-2">
                        {item.Name}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
              All Panel Members
            </h3>
          <table className="w-full border-collapse text-left text-sm text-black">
            <thead className="bg-gray-50 text-xs uppercase text-black">
              <tr>
                <th className="border px-6 py-3">Panelmember Name</th>
                <th className="border px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allocate;
