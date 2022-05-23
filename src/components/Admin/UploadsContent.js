import React, { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import { confirm } from "react-confirm-box";
import { storage } from "../../firebase-config";

const UploadsContent = () => {
  const [progress, setProgress] = useState(0); //store and display progress of upload in real time
  const [uploads, setUploads] = useState([]); //to store all documents from firebase storage
  const [state, setState] = useState("");

  var filesRef = ref(storage, "files/"); //refernce to all files in folder file

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    if (!file) {
      window.alert("no file selected");
      return;
    }
    const found = uploads.some((el) => el.name === file.name);
    //console.log("found value=",found)
    //console.log("file name",file.name)
    if (found) {
      window.alert("file with name already exists");
    } else {
      uploadFiles(file);
    }
  };
  const List = () => {
    listAll(filesRef).then((response) => {
      console.log("response", response);
      response.items.forEach((item) => {
        console.log(item.name);
        const name = item.name;
        getDownloadURL(item).then((url) => {
          setUploads((prev) => [
            ...prev,
            {
              name: name,
              url: url,
            },
          ]);
        });
      });
    });
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };
  const del = async (url) => {
    const result = await confirm("Are you sure you want to delete thid file");
    if (result) {
      const desertRef = ref(storage, url);
      //console.log(desertRef)
      deleteObject(desertRef)
        .then(() => {
          //console.log("success")
          window.alert("sucess fully deleted");
        })
        .catch((error) => {
          window.alert("Failed to delete");
          //console.log("failed",error)
        });
    } else {
      //console.log("users not removed");
      window.alert("File Not removed");
    }
  };
  
  useEffect(() => {
    List();
  }, []);

  return (
    <div className="h-full w-full overflow-auto p-5">
      Upload Templates
      <div className="mb-4 overflow-hidden bg-white bg-opacity-70 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <form onSubmit={formHandler}>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <div class="flex justify-center">
                  <label
                    for="formFile"
                    class="form-label mb-2 inline-block text-gray-700"
                  >
                    Upload File
                  </label>
                </div>
                <input
                  class="form-control
    m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  type="file"
                  id="formFile"
                ></input>
              </div>
            </div>
            <div class="flex justify-center">
              <div class=" w-6/12 rounded-full bg-gray-200">
                <div
                  class="text-white-100 rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-black"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
            <br />
            <div class="flex justify-center">
              <button
                type="submit"
                class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload
                <svg
                  class="h-6 w-6 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <h3>Uploaded {progress}%</h3> */}
      <p className="text-sm dark:text-red-500">
        Click On File Name to Download
      </p>
      <div class="grid grid-cols-4 gap-4">
        {uploads.map((up) => {
          return (
            <div class="w-full rounded-lg border border-gray-200 bg-white bg-opacity-70 p-0.5 shadow-md ">
              <div key={up.url} className="url">
                <br />
                <a href={up.url}>
                  <h5 class="mb-2 text-lg tracking-tight text-black ">
                    Name:{up.name}
                  </h5>
                </a>
                <br />
                <div class="flex justify-end">
                  <button
                    onClick={() => del(up.url)}
                    type="button"
                    class="inline-flex items-center rounded-lg bg-red-700 px-3 py-2   text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Delete
                    <svg
                      class="h-6 w-6 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadsContent;
