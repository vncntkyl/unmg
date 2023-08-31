import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignOffModal({
  modalType,
  closeModal,
  title,
  description
}) {

  return (
    <>
      {modalType && modalType === "signOffRater" ? (
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
              <div className="flex flex-col items-center">
                <div className="w-full my-2">
                  <label
                    for="recommendation"
                    className="text-[1.1rem] font-semibold pl-2"
                  >
                    Recommendations
                  </label>
                  <textarea
                    id="recommendation"
                    type="text"
                    rows={4}
                    className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                    placeholder="Enter your recommendations..."
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                  ></textarea>
                </div>
                <div className="py-2">
                  <span>
                    I confirm that the evaluation of this employee {full_name}{" "}
                    for this work year is accurate and appropriate based on
                    their performance over the past and their job
                    responsibilities.
                  </span>
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
                  type="submit"
                  value={continuebutton}
                  onClick={handleSignOffRecommendationsSubmit}
                  className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                />
              </div>
            </form>
          </div>
        </>
      ) : modalType === "signOffRater" ? (
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
              <div className="flex flex-col items-center">
                <div className="w-full my-2">
                  <label
                    for="recommendation"
                    className="text-[1.1rem] font-semibold pl-2"
                  >
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    type="text"
                    rows={4}
                    className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                    placeholder="Enter your comments..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
                <div className="py-2">
                  <span>
                    I {full_name} acknowledge that the assessment of my
                    performance for this work year reflects my efforts and job
                    responsibilities throughout this period.
                  </span>
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
                  type="submit"
                  value={continuebutton}
                  onClick={handleSignOffCommentsSubmit}
                  className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}
