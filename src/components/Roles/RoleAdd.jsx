import React, { useState } from "react";
import UnassignedEmployeeTable from "../UnassignedEmployeeTable";
import { useAuth } from "../../context/authContext";

export default function RoleAdd() {
  const { usertypeList, registerRole } = useAuth();
  const [members, setMembers] = useState([]);
  const [newRole, setNewRole] = useState({
    role_name: "",
    role_access: [],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const role_data = { ...newRole, memberList: [...members] };
    if(registerRole(role_data)){
      alert("ROLE ADDED!!!!");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 p-2 bg-default rounded-md md:flex-row items-start justify-evenly">
          <div className="flex flex-row gap-2 items-center">
            <label
              htmlFor="role_name"
              className="font-semibold whitespace-nowrap"
            >
              Role Name:
            </label>
            <input
              type="text"
              id="role_name"
              className="rounded-md outline-none p-2 w-full"
              onChange={(e) => {
                setNewRole((prev) => ({ ...prev, role_name: e.target.value }));
              }}
            />
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <span className="font-semibold">Role Restrictions: </span>
            <div className="flex flex-col">
              {usertypeList.length > 0 &&
                usertypeList.map((type) => {
                  return (
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="checkbox"
                        id={type.user_type}
                        value={type.user_type}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRole((current) => ({
                              ...current,
                              role_access: [
                                ...current.role_access,
                                e.target.value,
                              ],
                            }));
                          } else {
                            const tempRoleAccess = newRole.role_access.filter(
                              (access) => access !== e.target.value
                            );
                            setNewRole((current) => ({
                              ...current,
                              role_access: tempRoleAccess,
                            }));
                          }
                        }}
                      />
                      <label htmlFor={type.user_type}>
                        {type.user_type_description}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <UnassignedEmployeeTable setMembers={setMembers} members={members} />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-un-blue-light w-full text-white rounded py-1 md:w-1/2 lg:w-1/4"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
