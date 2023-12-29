import React, { useEffect, useState } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../../context/apiList";

export default function deptHeadToSupervisorContent({
  selectedQuarter,
  selectedCompanyID,
  selectedDepartmentID,
  employeeType,
  query,
  currentEmployeeID,
  selectedKpiDuration,
  currentUserType,
  currentUserContractType,
}) {
  const uniqueEntries = [];
  const processedData = [];
  const [evaluationsFetched, setEvaluations] = useState([]);
  const [allEvaluations, setAllEvaluations] = useState([]);
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(
          url.retrieveEvaluation,
          {
            params: { evals: true },
          }
        );

        const extractedEvaluations = response.data;
        const extractedFirstQuarterRate = [];
        for (let i = 0; i < extractedEvaluations.length; i += 5) {
          const batch = extractedEvaluations.slice(i, i + 5);
          extractedFirstQuarterRate.push(batch);
        }
        setEvaluations(extractedFirstQuarterRate);
        setAllEvaluations(extractedEvaluations);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvaluations();
  }, [selectedQuarter, employeeType, selectedKpiDuration]);

  const RenderDeptHeadToSupervisorContent = () => {
    if (employeeType === "regular" && selectedQuarter === "All") {
      if (selectedKpiDuration == "All") {
        if (currentUserType <= 5 && currentUserType >= 3) {
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
                    <th
                      key={index}
                      className="text-center bg-gray-200 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allEvaluations
                  .filter(
                    (row) =>
                      (row.company == selectedCompanyID ||
                        selectedCompanyID == "All") &&
                      (row.department == selectedDepartmentID ||
                        selectedDepartmentID == "All") &&
                      row.Name.toLowerCase().includes(query) &&
                      row.contract_type == employeeType &&
                      (row.employee_id == currentEmployeeID ||
                        row.primary_evaluator == currentEmployeeID ||
                        row.secondary_evaluator == currentEmployeeID ||
                        row.tertiary_evaluator == currentEmployeeID)
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
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {evals.FirstQuarterRating}
                      </td>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {evals.MidYearRating}
                      </td>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {evals.ThirdQuarterRating}
                      </td>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {evals.YearEndRating}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        }
      }
      if (currentUserType <= 5 && currentUserType >= 3) {
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
              {allEvaluations
                .filter(
                  (row) =>
                    row.form_kpi_duration == selectedKpiDuration &&
                    (row.company == selectedCompanyID ||
                      selectedCompanyID == "All") &&
                    (row.department == selectedDepartmentID ||
                      selectedDepartmentID == "All") &&
                    row.Name.toLowerCase().includes(query) &&
                    row.contract_type == employeeType &&
                    (row.employee_id == currentEmployeeID ||
                      row.primary_evaluator == currentEmployeeID ||
                      row.secondary_evaluator == currentEmployeeID ||
                      row.tertiary_evaluator == currentEmployeeID)
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
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.FirstQuarterRating}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.MidYearRating}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.ThirdQuarterRating}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {evals.YearEndRating}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }
    }
    if (employeeType === "probationary" && selectedQuarter === "All") {
      if (currentUserContractType == "regular") {
        if (selectedKpiDuration == "All") {
          if (currentUserType <= 5 && currentUserType >= 3) {
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
                      "4th Quarter",
                      "Year End",
                      "Remarks",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="text-center bg-gray-200 px-4 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allEvaluations
                    .filter(
                      (row) =>
                        (row.company == selectedCompanyID ||
                          selectedCompanyID == "All") &&
                        (row.department == selectedDepartmentID ||
                          selectedDepartmentID == "All") &&
                        row.Name.toLowerCase().includes(query) &&
                        row.contract_type == employeeType &&
                        (row.employee_id == currentEmployeeID ||
                          row.primary_evaluator == currentEmployeeID ||
                          row.secondary_evaluator == currentEmployeeID ||
                          row.tertiary_evaluator == currentEmployeeID)
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
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.FirstQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.MidYearRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.ThirdQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.FourthQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.YearEndRating}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            );
          }
        }
        if (currentUserType <= 5 && currentUserType >= 3) {
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
                      "4th Quarter",
                      "Year End",
                      "Remarks",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="text-center bg-gray-200 px-4 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allEvaluations
                    .filter(
                      (row) =>
                      row.form_kpi_duration == selectedKpiDuration &&
                        (row.company == selectedCompanyID ||
                          selectedCompanyID == "All") &&
                        (row.department == selectedDepartmentID ||
                          selectedDepartmentID == "All") &&
                        row.Name.toLowerCase().includes(query) &&
                        row.contract_type == employeeType &&
                        (row.employee_id == currentEmployeeID ||
                          row.primary_evaluator == currentEmployeeID ||
                          row.secondary_evaluator == currentEmployeeID ||
                          row.tertiary_evaluator == currentEmployeeID)
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
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.FirstQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.MidYearRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.ThirdQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.FourthQuarterRating}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {evals.YearEndRating}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            );
          }
      }
    }
    if (employeeType === "regular" && selectedQuarter != "All") {
      if (selectedKpiDuration == "All") {
        if (currentUserType <= 5 && currentUserType >= 3) {
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
                    <th
                      key={index}
                      className="text-center bg-gray-200 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluationsFetched.forEach((batch) =>
                  batch.forEach((row) => {
                    const existingEntry = uniqueEntries.find(
                      (entry) =>
                        entry.Job_Title === row.Job_Title &&
                        entry.Name === row.Name
                    );

                    if (!existingEntry) {
                      uniqueEntries.push({
                        Job_Title: row.Job_Title,
                        Name: row.Name,
                      });
                    }

                    const existingProcessedDataEntry = processedData.find(
                      (entry) =>
                        entry.Job_Title === row.Job_Title &&
                        entry.Name === row.Name
                    );

                    if (existingProcessedDataEntry) {
                      for (const key in row) {
                        if (
                          key !== "Job_Title" &&
                          key !== "Name" &&
                          key.includes("Quarter")
                        ) {
                          existingProcessedDataEntry[key] = [
                            ...(existingProcessedDataEntry[key] || []),
                            row[key],
                          ]; // Store the quarter value as an array of numbers
                        }
                      }
                    } else {
                      const processedRow = {
                        Job_Title: row.Job_Title,
                        Name: row.Name,
                        ...row,
                      };

                      for (const key in processedRow) {
                        if (
                          key !== "Job_Title" &&
                          key !== "Name" &&
                          key.includes("Quarter")
                        ) {
                          processedRow[key] = [processedRow[key]]; // Store the quarter value as an array of numbers
                        }
                      }
                      processedData.push(processedRow);
                    }
                  })
                )}

                {processedData
                  .filter(
                    (row) =>
                      (row.company == selectedCompanyID ||
                        selectedCompanyID == "All") &&
                      (row.department == selectedDepartmentID ||
                        selectedDepartmentID == "All") &&
                      row.Name.toLowerCase().includes(query) &&
                      row.contract_type == employeeType &&
                      (row.employee_id == currentEmployeeID ||
                        row.primary_evaluator == currentEmployeeID ||
                        row.secondary_evaluator == currentEmployeeID ||
                        row.tertiary_evaluator == currentEmployeeID)
                  )
                  .map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {row.Name}
                      </td>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {row.Job_Title}
                      </td>
                      {row[selectedQuarter].slice(0, 4).map((rating, index) => (
                        <td
                          className="text-center bg-gray-200 px-4 py-2"
                          key={index}
                        >
                          {rating}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        }
      }
      if (currentUserType <= 5 && currentUserType >= 3) {
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
              {evaluationsFetched.forEach((batch) =>
                batch.forEach((row) => {
                  const existingEntry = uniqueEntries.find(
                    (entry) =>
                      entry.Job_Title === row.Job_Title &&
                      entry.Name === row.Name
                  );

                  if (!existingEntry) {
                    uniqueEntries.push({
                      Job_Title: row.Job_Title,
                      Name: row.Name,
                    });
                  }

                  const existingProcessedDataEntry = processedData.find(
                    (entry) =>
                      entry.Job_Title === row.Job_Title &&
                      entry.Name === row.Name
                  );

                  if (existingProcessedDataEntry) {
                    for (const key in row) {
                      if (
                        key !== "Job_Title" &&
                        key !== "Name" &&
                        key.includes("Quarter")
                      ) {
                        existingProcessedDataEntry[key] = [
                          ...(existingProcessedDataEntry[key] || []),
                          row[key],
                        ]; // Store the quarter value as an array of numbers
                      }
                    }
                  } else {
                    const processedRow = {
                      Job_Title: row.Job_Title,
                      Name: row.Name,
                      ...row,
                    };

                    for (const key in processedRow) {
                      if (
                        key !== "Job_Title" &&
                        key !== "Name" &&
                        key.includes("Quarter")
                      ) {
                        processedRow[key] = [processedRow[key]]; // Store the quarter value as an array of numbers
                      }
                    }
                    processedData.push(processedRow);
                  }
                })
              )}

              {processedData
                .filter(
                  (row) =>
                    row.form_kpi_duration == selectedKpiDuration &&
                    (row.company == selectedCompanyID ||
                      selectedCompanyID == "All") &&
                    (row.department == selectedDepartmentID ||
                      selectedDepartmentID == "All") &&
                    row.Name.toLowerCase().includes(query) &&
                    row.contract_type == employeeType &&
                    (row.employee_id == currentEmployeeID ||
                      row.primary_evaluator == currentEmployeeID ||
                      row.secondary_evaluator == currentEmployeeID ||
                      row.tertiary_evaluator == currentEmployeeID)
                )
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {row.Name}
                    </td>
                    <td className="text-center bg-gray-200 px-4 py-2">
                      {row.Job_Title}
                    </td>
                    {row[selectedQuarter].slice(0, 4).map((rating, index) => (
                      <td
                        className="text-center bg-gray-200 px-4 py-2"
                        key={index}
                      >
                        {rating}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }
    }
    if (employeeType === "probationary" && selectedQuarter != "All") {
      if (currentUserContractType == "regular") {
        if (selectedKpiDuration == "All") {
          if (currentUserType <= 5 && currentUserType >= 3) {
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
                      <th
                        key={index}
                        className="text-center bg-gray-200 px-4 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {evaluationsFetched.forEach((batch) =>
                    batch.forEach((row) => {
                      const existingEntry = uniqueEntries.find(
                        (entry) =>
                          entry.Job_Title === row.Job_Title &&
                          entry.Name === row.Name
                      );

                      if (!existingEntry) {
                        uniqueEntries.push({
                          Job_Title: row.Job_Title,
                          Name: row.Name,
                        });
                      }

                      const existingProcessedDataEntry = processedData.find(
                        (entry) =>
                          entry.Job_Title === row.Job_Title &&
                          entry.Name === row.Name
                      );

                      if (existingProcessedDataEntry) {
                        for (const key in row) {
                          if (
                            key !== "Job_Title" &&
                            key !== "Name" &&
                            key.includes("Quarter")
                          ) {
                            existingProcessedDataEntry[key] = [
                              ...(existingProcessedDataEntry[key] || []),
                              row[key],
                            ]; // Store the quarter value as an array of numbers
                          }
                        }
                      } else {
                        const processedRow = {
                          Job_Title: row.Job_Title,
                          Name: row.Name,
                          ...row,
                        };

                        for (const key in processedRow) {
                          if (
                            key !== "Job_Title" &&
                            key !== "Name" &&
                            key.includes("Quarter")
                          ) {
                            processedRow[key] = [processedRow[key]]; // Store the quarter value as an array of numbers
                          }
                        }
                        processedData.push(processedRow);
                      }
                    })
                  )}

                  {processedData
                    .filter(
                      (row) =>
                        (row.company == selectedCompanyID ||
                          selectedCompanyID == "All") &&
                        (row.department == selectedDepartmentID ||
                          selectedDepartmentID == "All") &&
                        row.Name.toLowerCase().includes(query) &&
                        row.contract_type == employeeType &&
                        (row.employee_id == currentEmployeeID ||
                          row.primary_evaluator == currentEmployeeID ||
                          row.secondary_evaluator == currentEmployeeID ||
                          row.tertiary_evaluator == currentEmployeeID)
                    )
                    .map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {row.Name}
                        </td>
                        <td className="text-center bg-gray-200 px-4 py-2">
                          {row.Job_Title}
                        </td>
                        
                        {row[selectedQuarter]
                          .slice(0, 4)
                          .map((rating, index) => (
                            <td
                              className="text-center bg-gray-200 px-4 py-2"
                              key={index}
                            >
                              {rating}
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            );
          }
        }
        if (currentUserType <= 5 && currentUserType >= 3) {
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
                    <th
                      key={index}
                      className="text-center bg-gray-200 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluationsFetched.forEach((batch) =>
                  batch.forEach((row) => {
                    const existingEntry = uniqueEntries.find(
                      (entry) =>
                        entry.Job_Title === row.Job_Title &&
                        entry.Name === row.Name
                    );

                    if (!existingEntry) {
                      uniqueEntries.push({
                        Job_Title: row.Job_Title,
                        Name: row.Name,
                      });
                    }

                    const existingProcessedDataEntry = processedData.find(
                      (entry) =>
                        entry.Job_Title === row.Job_Title &&
                        entry.Name === row.Name
                    );

                    if (existingProcessedDataEntry) {
                      for (const key in row) {
                        if (
                          key !== "Job_Title" &&
                          key !== "Name" &&
                          key.includes("Quarter")
                        ) {
                          existingProcessedDataEntry[key] = [
                            ...(existingProcessedDataEntry[key] || []),
                            row[key],
                          ]; // Store the quarter value as an array of numbers
                        }
                      }
                    } else {
                      const processedRow = {
                        Job_Title: row.Job_Title,
                        Name: row.Name,
                        ...row,
                      };

                      for (const key in processedRow) {
                        if (
                          key !== "Job_Title" &&
                          key !== "Name" &&
                          key.includes("Quarter")
                        ) {
                          processedRow[key] = [processedRow[key]]; // Store the quarter value as an array of numbers
                        }
                      }
                      processedData.push(processedRow);
                    }
                  })
                )}

                {processedData
                  .filter(
                    (row) =>
                      row.form_kpi_duration == selectedKpiDuration &&
                      (row.company == selectedCompanyID ||
                        selectedCompanyID == "All") &&
                      (row.department == selectedDepartmentID ||
                        selectedDepartmentID == "All") &&
                      row.Name.toLowerCase().includes(query) &&
                      row.contract_type == employeeType &&
                      (row.employee_id == currentEmployeeID ||
                        row.primary_evaluator == currentEmployeeID ||
                        row.secondary_evaluator == currentEmployeeID ||
                        row.tertiary_evaluator == currentEmployeeID)
                  )
                  .map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {row.Name}
                      </td>
                      <td className="text-center bg-gray-200 px-4 py-2">
                        {row.Job_Title}
                      </td>
                      {row[selectedQuarter].slice(0, 4).map((rating, index) => (
                        <td
                          className="text-center bg-gray-200 px-4 py-2"
                          key={index}
                        >
                          {rating}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          );
        }
      }
    }
  };

  return (
    <>
      {/* Table */}
      <div className="max-w-full max-h-[400px] shadow-md rounded-md bg-white overflow-x-auto mx-2 mt-1">
        <RenderDeptHeadToSupervisorContent
          selectedQuarter={selectedQuarter}
          selectedCompanyID={selectedCompanyID}
          selectedDepartmentID={selectedDepartmentID}
          employeeType={employeeType}
          query={query}
          currentUserType={currentUserType}
          currentEmployeeID={currentEmployeeID}
          currentUserContractType={currentUserContractType}
          selectedKpiDuration={selectedKpiDuration}
        />
      </div>
    </>
  );
}
