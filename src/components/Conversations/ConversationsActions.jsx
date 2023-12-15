import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import classNames from "classnames";
import { ConversationsModalDelete } from "../../misc/ConversationsModal";

export default function ConversationsActions({
  convo_id,
    employee_id,
    employee_name,
}) {
  const [deleteConvoModal, setDeleteConvoModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="outline-none cursor-pointer hover:text-un-red transition-all"
        onClick={() => {
          setDeleteConvoModal(true);
        }}
      >
        <FaRegTrashAlt />
      </button>
      {deleteConvoModal && (
        <ConversationsModalDelete
          closeModal={setDeleteConvoModal}
          convo_id={convo_id}
          employee_id={employee_id}
          employee_name={employee_name}
        />
      )}
      <div
        className={classNames(
          "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
          deleteConvoModal === false && "z-[-1] hidden pointer-events-none"
        )}
        onClick={() => {
          setDeleteConvoModal(false);
        }}
      />
    </>
  );
}
