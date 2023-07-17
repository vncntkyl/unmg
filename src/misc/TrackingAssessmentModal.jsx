import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";

export default function TrackingAssessmentModal({
  closeModal,
  type,
  title,
  employee_id,
  first_name,
  message,
  continuebutton,
}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const handleDiscussSubmit = (e) => {
    e.preventDefault();
    if (subject.length === 0 || description.length === 0) {
      alert("Please fill all the fields!");
    }
    else{
      const url = "http://localhost/unmg_pms/api/userSubmitDiscussion.php";
      let fData = new FormData();
      fData.append("submit", true);
      fData.append("employee_id", employee_id);
      fData.append("first_name", first_name);
      fData.append("subject", subject);
      fData.append("description", description);
      axios.post(url, fData)
                .then(response => alert(response.data))
                .catch(error => alert(error));
      closeModal(false);
    }
  };

  const notifyEmployee = () => {
    if (type === "discussion") {
      closeModal(false);
      alert("A 1 on 1 disscussion with " + first_name + " has been sent!");
    } else if (type === "approval") {
      closeModal(false);
      alert(
        "The assessment of " + first_name + " has been approved successfully!"
      );
    }
  };
  return (
    <>
      {type == "discussion" ? (
        <>
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
            <form>
              {/* TITLE */}
              <div className="flex flex-row items-center justify-between border-b border-gray py-1">
                <span className="font-semibold text-[1.1rem]">{title}</span>
                <button
                  className="text-[.7rem] px-1"
                  onClick={() => closeModal(false)}
                >
                  <GrClose />
                </button>
              </div>
              {/* MESSAGE */}
              <div className="p-2">
                <div className="mb-6">
                  <span className="text-[1rem]">{message}</span>
                </div>
                <label for="subject" className="text-[1rem] pl-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md mb-4"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <label for="description" className="text-[1rem] pl-2">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  rows={4}
                  className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              {/* FOOTER */}
              <div className="flex flex-row items-center justify-end gap-4 p-2">
                <button
                  className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
                  onClick={() => closeModal(false)}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value={continuebutton}
                  onClick={handleDiscussSubmit}
                  className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
            {/* TITLE */}
            <div className="flex flex-row items-center justify-between border-b border-gray py-1">
              <span className="font-semibold text-[1.1rem]">{title}</span>
              <button
                className="text-[.7rem] px-1"
                onClick={() => closeModal(false)}
              >
                <GrClose />
              </button>
            </div>
            {/* MESSAGE */}
            <div className="flex items-center">
              <div className="py-2">
                <span>{message}</span>
              </div>
            </div>
            {/* FOOTER */}
            <div className="flex flex-row items-center justify-end gap-4 p-2">
              <button
                className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>
              <input
                type="button"
                value={continuebutton}
                onClick={() => notifyEmployee()}
                className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
