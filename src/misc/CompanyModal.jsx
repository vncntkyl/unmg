import React, { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useFunction } from "../context/FunctionContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../context/authContext";

export default function CompanyModal({
  title,
  action,
  closeModal,
  companyData,
  departmentList,
  toggleSuccessModal,
}) {
  const { addCompany, addDepartment, currentUser } = useAuth();
  const { capitalize, capitalizeSentence } = useFunction();

  const [companyName, setCompanyName] = useState(
    companyData ? companyData.company_name : null
  );
  const [departments, setDepartments] = useState(
    departmentList
      ? departmentList
          .filter((item) => item.company_id === companyData.company_id)
          .map((item) => ({ department_name: item.department_name }))
      : []
  );
  const handleContinue = () => {
    if (title === "add company") {
      const company_data = {
        company_name: companyName,
        department_list: [
          departments.map((dept) => {
            return dept.department_name;
          }),
        ],
      };
      if (addCompany(company_data, JSON.parse(currentUser).employee_id)) {
        closeModal("standby");
        toggleSuccessModal("Company has been added successfully.");
      }
    } else if (title === "add department") {
      const companyDepartments = departments.map((d) => ({
        department_name: d.department_name,
        company_id: companyData.company_id,
      }));
      const departmentNamesToRemove = departmentList
        .filter((item) => {
          return item.company_id === companyData.company_id;
        })
        .map((item) => {
          return {
            department_name: item.department_name,
            company_id: item.company_id,
          };
        });

      const newDepartments = companyDepartments.filter((department) => {
        return !departmentNamesToRemove.some(
          (old) =>
            old.department_name === department.department_name &&
            old.company_id === department.company_id
        );
      });

      const company_id = companyData.company_id;
      const company_name = companyData.company_name;
      if (addDepartment(company_id, company_name, newDepartments, JSON.parse(currentUser).employee_id)) {
        closeModal("standby");
        toggleSuccessModal("Department has been added successfully.");
      }
    }
  };

  const appendEmptyInput = () => {
    setDepartments((prev) => {
      return [
        ...prev,
        {
          department_name: "",
        },
      ];
    });
  };
  
  const removeDepartmentList = (index) => {
    setDepartments((prevDepartmentList) => {
      const updatedDepartments = [...prevDepartmentList];
      return updatedDepartments.filter((d, i) => i !== index);
    });
  };
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[25] bg-white rounded-md p-2 text-center transition-all md:min-w-[70%] lg:min-w-[0%]">
        {/* TITLE */}
        <div className="flex flex-row items-center justify-between border-b border-gray py-1">
          <span className="font-semibold text-[1.1rem]">
            {capitalizeSentence(title)}
          </span>
          <button
            onClick={() => {
              closeModal("standby");
            }}
            className="text-[.7rem] px-1"
          >
            <GrClose />
          </button>
        </div>
        {/* MESSAGE */}
        <div className="py-2">
          <form className="flex flex-col gap-2">
            <div className="bg-default p-2 rounded-md">
              <label htmlFor="company_name" className="font-semibold">
                Company Name:{" "}
              </label>
              {companyData ? (
                <span>{companyData.company_name}</span>
              ) : (
                <input
                  className="bg-white p-1 rounded outline-none"
                  type="text"
                  id="company_name"
                  onChange={(e) => {
                    if (
                      e.target.value.length !== 0 &&
                      departments.length === 0
                    ) {
                      setDepartments([
                        {
                          department_name: "",
                        },
                      ]);
                    }
                    setCompanyName(e.target.value);
                  }}
                />
              )}
            </div>
            <div className="bg-default p-2 rounded-md">
              {/* department multiple inputs */}
              <div className="flex flex-row gap-2 items-center">
                <span className="font-semibold">Add Department/s: </span>
                {departments.length === 0 && (
                  <button type="button" onClick={() => appendEmptyInput()}>
                    <AiOutlinePlus />
                  </button>
                )}
              </div>
              <div>
                <div className="flex flex-col gap-2 py-1">
                  {departments.map((dept, index) => {
                    return (
                      <>
                        <div className="flex flex-row items-center gap-1 pl-2">
                          <div className="w-[20px] h-[20px] border-[2px] border-t-0 border-r-0 rounded-bl-lg border-gray top-[-50%] translate-y-[-50%]" />
                          <input
                            type="text"
                            className="p-1 rounded outline-none"
                            placeholder="Enter department name"
                            value={dept.department_name}
                            disabled={
                              title === "add department" &&
                              departmentList.find(
                                (d) =>
                                  d.department_name === dept.department_name &&
                                  d.company_id === companyData.company_id
                              )
                            }
                            onChange={(e) => {
                              const updatedDepartments = [...departments];
                              updatedDepartments[index] = {
                                ...updatedDepartments[index],
                                department_name: e.target.value,
                              };
                              setDepartments(updatedDepartments);
                            }}
                          />
                          <div className="flex flex-row gap-2 items-center px-1">
                            {departments.length !== 1 && (
                              <>
                                <button
                                  type="button"
                                  className={
                                    title === "add department" &&
                                    departmentList.find(
                                      (d) =>
                                        d.department_name ===
                                          dept.department_name &&
                                        d.company_id === companyData.company_id
                                    ) &&
                                    "hidden"
                                  }
                                  onClick={() => {
                                    removeDepartmentList(index);
                                  }}
                                >
                                  <AiOutlineMinus />
                                </button>
                              </>
                            )}
                            {index === departments.length - 1 &&
                            dept.department_name.length > 0 ? (
                              <button
                                type="button"
                                onClick={() => appendEmptyInput()}
                              >
                                <AiOutlinePlus />
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* FOOTER */}
        <div className="flex flex-row items-center justify-end gap-2 p-2">
          <button
            onClick={() => {
              closeModal("standby");
            }}
            className="text-gray bg-white border border-gray p-1 px-2 rounded-md text-[.9rem] hover:bg-gray hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleContinue();
            }}
            className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue"
          >
            {capitalize(action)}
          </button>
        </div>
      </div>
    </>
  );
}
