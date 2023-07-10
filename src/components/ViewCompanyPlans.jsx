import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewCompanyPlans = ({
  selectedYear,
  filterSelectedObjectiveOrPillar,
  selectedCompanyID,
  selectedDepartmentID,
  employeeType,
  query,
}) => {
  const [fetchedPillarOrObjectives, setFetchedPillarOrObjectives] = useState(
    []
  );
  const uniqueEntries = [];
  const processedData = [];
  useEffect(() => {
    const fetchPillarOrObjectives = async () => {
      try {
        const response = await axios.get(
          "http://localhost/unmg_pms/api/retrieveKpiDescAndPillarPercentage.php",
          {
            params: { pillarDesc: true },
          }
        );
        const axiosFetchedData = response.data;
        const displayedPillarEmployeeIds = new Set();
        const extractedObjectivesOrPillar = [];
  
        for (let i = 0; i < axiosFetchedData.length; i += 4) {
          const batch = axiosFetchedData.slice(i, i + 4);
          const uniqueBatch = [];
          
          for (const pillar of batch) {
            const pillarEmployeeId = pillar.employee_id;
            const pillarIdCombination = `${pillar.pillar_id}-${pillarEmployeeId}`;
            
            if (!displayedPillarEmployeeIds.has(pillarIdCombination)) {
              displayedPillarEmployeeIds.add(pillarIdCombination);
              uniqueBatch.push(pillar);
            }
            
            if (uniqueBatch.length === 4) {
              break;
            }
          }
          extractedObjectivesOrPillar.push(uniqueBatch);
        }
        setFetchedPillarOrObjectives(extractedObjectivesOrPillar);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchPillarOrObjectives();
  }, [selectedYear]);
  
  

  const RenderTable = () => {
    if (filterSelectedObjectiveOrPillar === "Pillar Percentage") {
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
            {fetchedPillarOrObjectives.forEach((batch) =>
              batch.forEach((row) => {
                const existingEntry = uniqueEntries.find(
                  (entry) =>
                    entry.Job_Title === row.Job_Title && entry.Name === row.Name
                );

                if (!existingEntry) {
                  uniqueEntries.push({
                    Job_Title: row.Job_Title,
                    Name: row.Name,
                  });
                }

                const existingProcessedDataEntry = processedData.find(
                  (entry) =>
                    entry.Job_Title === row.Job_Title && entry.Name === row.Name
                );

                if (existingProcessedDataEntry) {
                  for (const key in row) {
                    if (
                      key !== "Job_Title" &&
                      key !== "Name" &&
                      key.includes("pillar_percentage")
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
                      key.includes("pillar_percentage")
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
                  row.contract_type === employeeType &&
                  (row.company == selectedCompanyID ||
                    selectedCompanyID == "All") &&
                  (row.department == selectedDepartmentID ||
                    selectedDepartmentID == "All") &&
                  row.EvalPillarID == row.pillar_id &&
                  row.Name.toLowerCase().includes(query)
              )
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="text-center bg-gray-200 px-4 py-2">
                    {row.Name}
                  </td>
                  <td className="text-center bg-gray-200 px-4 py-2">
                    {row.Job_Title}
                  </td>
                  {row.pillar_percentage.slice(0, 4).map((rating, index) => (
                    <td
                      className="text-center bg-gray-200 px-4 py-2"
                      key={index}
                    >
                      {rating}%
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      );
    }
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
          {fetchedPillarOrObjectives.forEach((batch) =>
            batch.forEach((row) => {
              const existingEntry = uniqueEntries.find(
                (entry) =>
                  entry.Job_Title === row.Job_Title && entry.Name === row.Name
              );

              if (!existingEntry) {
                uniqueEntries.push({
                  Job_Title: row.Job_Title,
                  Name: row.Name,
                });
              }

              const existingProcessedDataEntry = processedData.find(
                (entry) =>
                  entry.Job_Title === row.Job_Title && entry.Name === row.Name
              );

              if (existingProcessedDataEntry) {
                for (const key in row) {
                  if (
                    key !== "Job_Title" &&
                    key !== "Name" &&
                    key.includes("objective")
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
                    key.includes("objective")
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
                row.contract_type === employeeType &&
                (row.company == selectedCompanyID ||
                  selectedCompanyID == "All") &&
                (row.department == selectedDepartmentID ||
                  selectedDepartmentID == "All") &&
                row.EvalPillarID == row.pillar_id &&
                row.Name.toLowerCase().includes(query)
            )
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="text-center bg-gray-200 px-4 py-2">
                  {row.Name}
                </td>
                <td className="text-center bg-gray-200 px-4 py-2">
                  {row.Job_Title}
                </td>
                {row.objective.slice(0, 4).map((rating, index) => (
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

export default ViewCompanyPlans;