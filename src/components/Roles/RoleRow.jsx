import React from "react";
import { CiCircleMore } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import LazyImage from "../../misc/LazyImage";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";

export default function RoleRow({
  user,
  companyList,
  departmentList,
  visibility,
  setVisibility,
  unassigned,
  toggleModal,
  setEmployee,
  setMembers,
  members,
}) {
  const navigate = useNavigate();
  const { formatName, getPath } = useFunction();

  //CREATE USE EFFECT FOR CLICKING OUTSIDE THE DIV
  return (
    <>
      <tr>
        <td className="p-1 ">
          {user.picture ? (
            <div className="flex items-center justify-center">
              <LazyImage
                key={user.users_id}
                src={user.picture}
                alt={user.first_name + "_profile"}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center text-dark-gray">
              <FaUserCircle className="text-[2rem]" />
            </div>
          )}
        </td>
        <td className="whitespace-nowrap p-1  bg-white">
          {user.last_name +
            ", " +
            user.first_name +
            " " +
            user.middle_name.substring(0, 1) +
            "."}
        </td>
        <td className="whitespace-nowrap p-1 ">{user.email}</td>
        <td className="whitespace-nowrap p-1 ">
          {companyList.find(
            (company) => company.company_id === user.company_id
          ) &&
            companyList.find(
              (company) => company.company_id === user.company_id
            ).company_name}
        </td>
        <td className="p-1 ">
          {departmentList.find(
            (dept) => dept.department_id == user.department_id
          ) &&
            departmentList.find(
              (dept) => dept.department_id == user.department_id
            ).department_name}
        </td>
        <td className="whitespace-nowrap p-1 ">{user.job_description}</td>
        {!unassigned ? (
          <>
            <td className="relative text-center">
              <button
                type="button"
                onClick={() => {
                  if (visibility) {
                    const isVisible = visibility.find(
                      (u) => u.modal && u.users_id === user.users_id
                    );
                    const updatedVisibility = visibility.map((u) =>
                      u.users_id === user.users_id
                        ? { ...u, modal: !isVisible }
                        : { ...u, modal: false }
                    );
                    setVisibility(updatedVisibility);
                  }
                }}
                className="outline-none cursor-pointer text-un-blue text-[1.5rem] hover:text-un-blue-light transition-all"
              >
                <CiCircleMore />
              </button>
              {visibility
                ? visibility.find(
                    (u) => u.modal == true && u.users_id === user.users_id
                  ) && (
                    <>
                      <div
                        className={classNames(
                          "absolute top-1/4 right-[75%] text-[.9rem] origin-top-right min-w-max bg-white shadow-md rounded flex flex-col transition-all z-[25] p-2 items-start"
                        )}
                      >
                        <button
                          className="p-1 hover:bg-gray w-full text-left rounded text-black"
                          onClick={() => {
                            localStorage.setItem(
                              "user",
                              JSON.stringify(user)
                            );
                            localStorage.setItem(
                              "redirect_back_to",
                              getPath()
                            );
                            navigate(
                              "/employees/profile/" +
                                formatName(user.first_name)
                            );
                          }}
                        >
                          View Employee
                        </button>
                        <button
                          className="p-1 hover:bg-gray w-full text-left rounded text-black"
                          onClick={() => {
                            toggleModal("re-assign role");
                            setEmployee(user);
                            setVisibility(
                              visibility.map((u) => ({ ...u, modal: false }))
                            );
                          }}
                        >
                          Re-assign Role
                        </button>
                        <button
                          className="p-1 hover:bg-gray w-full text-left rounded text-un-red"
                          onClick={() => {
                            toggleModal("unassign role");
                            setEmployee(user);
                            setVisibility(
                              visibility.map((u) => ({ ...u, modal: false }))
                            );
                          }}
                        >
                          Unassign Role
                        </button>
                      </div>
                      <div
                        className={classNames(
                          "bg-[#00000000] fixed h-full w-full z-[20] top-0 left-0 pointer-events-auto"
                        )}
                        onClick={() => {
                          setVisibility(
                            visibility.map((u) => ({ ...u, modal: false }))
                          );
                        }}
                      />
                    </>
                  )
                : console.log(1)}
            </td>
          </>
        ) : getPath() !== "/roles/unassigned_employees" ? (
          <>
            <td className="text-center">
              <input
                type="checkbox"
                value={user.users_id}
                onChange={(e) => {
                  if(e.target.checked){
                    setMembers(current => ([...current,user.users_id]))
                  }else{
                    const tempMembers = members.filter(memberID => memberID !== user.users_id);
                    setMembers(tempMembers);
                  }
                }}
              />
            </td>
          </>
        ) : (
          <>
            <td className="text-center">
              <button
                type="button"
                onClick={() => {
                  toggleModal("assign role");
                  setEmployee(user);
                }}
                className="bg-un-blue-light text-white p-1 rounded-md hover:bg-un-blue"
              >
                Assign
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
}
