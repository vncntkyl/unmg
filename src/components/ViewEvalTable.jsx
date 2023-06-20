import React, { useEffect, useState } from "react";
import axios from "axios";

const EvalTable = ({
  selectedQuarter,
  selectedCompanyID,
  selectedDepartmentID,
  employeeType,
  query
}) => {
  const [evaluationsFetched, setEvaluations] = useState([]);
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(
          "http://localhost/unmg_pms/api/retrieveEvaluation.php",
          {
            params: { evals: true },
          }
        );
        setEvaluations(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvaluations();
  }, [selectedQuarter]);

  const RenderTable = () => {
    if (employeeType === "regular") {
      if (selectedQuarter === "All") {
        return (
          <table className="table-auto w-full">
            <thead className="bg-un-blue-light text-white">
              <tr>
                {[
                  "Name",
                  "Job Title",
                  "1st Quarter",
                  "Mid Year",
                  "3rd Quarter",
                  "Year-End",
                  "Remarks",
                ].map((header, index) => (
                  <th key={index} className="text-center bg-gray-200 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluationsFetched
                .filter((evals) => evals.contract_type === employeeType && evals.Name.toLowerCase().includes(query))
                .map((evals) => (
                  <tr key={evals.id}>
                    {[
                      evals.Name,
                      evals.Job_Title,
                      evals.First_Quarter,
                      evals.Mid_Year,
                      evals.Third_Quarter,
                      evals.Year_End,
                      evals.Remarks,
                    ].map((value, index) => (
                      <td
                        key={index}
                        className="text-center bg-gray-200 px-4 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      } else if (selectedQuarter !== "") {
        return (
          <table className="table-auto w-full">
            <thead className="bg-un-blue-light text-white">
              <tr>
                {[
                  "Name",
                  "Job Title",
                  "Financial Bottomline",
                  "Customer Delight",
                  "Operational Excellence",
                  "Organizational Capacity",
                ].map((header, index) => (
                  <th key={index} className="text-center bg-gray-200 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {evaluationsFetched
                .filter(
                  (evals) =>
                    evals.contract_type === employeeType &&
                    (evals.company_id == selectedCompanyID ||
                      selectedCompanyID == "All") &&
                    (evals.department_id == selectedDepartmentID ||
                      selectedDepartmentID == "All")
                      && evals.Name.toLowerCase().includes(query)
                )
                .reduce((uniqueEvals, evals) => {
                  const isEvalExist = uniqueEvals.find(
                    (item) =>
                      item.Name === evals.Name &&
                      item.Job_Title === evals.Job_Title
                  );
                  if (!isEvalExist) {
                    uniqueEvals.push(evals);
                  }
                  return uniqueEvals;
                }, [])
                .map((evals) => (
                  <tr key={evals.id}>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.Name}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.Job_Title}
                    </td>
                    {/* Render the rest of the columns */}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "First_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.First_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Second_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Second_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Third_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Third_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Fourth_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Fourth_Quarter}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }
    } else {
      if (selectedQuarter === "All") {
        return (
          <table className="table-auto w-full">
            <thead className="bg-un-blue-light text-white">
              <tr>
                {[
                  "Name",
                  "Job Title",
                  "1st Quarter",
                  "2nd Quarter",
                  "3rd Quarter",
                  "4th Quarter",
                  "5th Quarter",
                  "Year-End",
                  "Remarks",
                ].map((header, index) => (
                  <th key={index} className="text-center bg-gray-200 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluationsFetched
                .filter((evals) => evals.contract_type === employeeType)
                .map((evals) => (
                  <tr key={evals.id}>
                    {[
                      evals.Name,
                      evals.Job_Title,
                      evals.First_Quarter,
                      evals.Mid_Year,
                      evals.Third_Quarter,
                      evals.Year_End,
                      evals.Remarks,
                    ].map((value, index) => (
                      <td
                        key={index}
                        className="text-center bg-gray-200 px-4 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }
      else if (selectedQuarter !== "") {
        return (
          <table className="table-auto w-full">
            <thead className="bg-un-blue-light text-white">
              <tr>
                {[
                  "Name",
                  "Job Title",
                  "Financial Bottomline",
                  "Customer Delight",
                  "Operational Excellence",
                  "Organizational Capacity",
                ].map((header, index) => (
                  <th key={index} className="text-center bg-gray-200 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {evaluationsFetched
                .filter(
                  (evals) =>
                    evals.contract_type === employeeType &&
                    (evals.company_id == selectedCompanyID ||
                      selectedCompanyID == "All") &&
                    (evals.department_id == selectedDepartmentID ||
                      selectedDepartmentID == "All")
                )
                .reduce((uniqueEvals, evals) => {
                  const isEvalExist = uniqueEvals.find(
                    (item) =>
                      item.Name === evals.Name &&
                      item.Job_Title === evals.Job_Title
                  );
                  if (!isEvalExist) {
                    uniqueEvals.push(evals);
                  }
                  return uniqueEvals;
                }, [])
                .map((evals) => (
                  <tr key={evals.id}>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.Name}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.Job_Title}
                    </td>
                    {/* Render the rest of the columns */}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "First_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.First_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Second_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Second_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Third_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Third_Quarter}
                        </td>
                      ))}
                    {evaluationsFetched
                      .filter(
                        (evals) =>
                          selectedQuarter === "Fourth_Quarter" &&
                          evals.EvalPillarID === evals.pillar_id
                      )
                      .map((evals) => (
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.Fourth_Quarter}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }
    }
  };

  return (
    <>
      {/* Table */}
      <div className="max-w-full max-h-[400px] shadow-md rounded-md bg-white overflow-x-auto mx-2 mt-1">
        <RenderTable />
      </div>
    </>
  );
};

export default EvalTable;
