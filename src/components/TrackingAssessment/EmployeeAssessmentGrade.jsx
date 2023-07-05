import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
export default function EmployeeAssessmentGrade({ employee_id, quarter }) {
  const [grades, setGrades] = useState([]);
  const [checkForm, setcheckForm] = useState();
  console.table(grades);
  const pillarNames = [...new Set(grades.map((grade) => ({ pillar_name: grade.pillar_name, pillar_description: grade.pillar_description, pillar_percentage: grade.pillar_percentage })))];
  useEffect(() => {
    const getGrades = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userGrading: true,
            quarter:quarter,
            empID: employee_id
          },
        });
        setGrades(response.data);
        const ColumnAllFalse = response.data.length > 0 && response.data.every((form) => form.eval_user_id)
        setcheckForm(ColumnAllFalse);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    if (!employee_id) return;
    getGrades();
  }, [employee_id]);

  return (
    <>
      {checkForm === false ? (
        <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
          <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              Sorry, the employee have not yet created their main goals yet
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
          <div className="w-full pb-4">
            <span className="font-bold text-dark-gray">
              Employee Grades:
            </span>
          </div>
          {/* Test */}


          {pillarNames.map((pillar) => (
            <div key={pillarNames} className="bg-white w-full rounded-md p-2 mb-4">
              <div className="w-full">
                <span className="text-black font-semibold">
                  {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}`}
                </span>
              </div>
              {grades.map((grade) => {
                if (grade.pillar_name === pillar.pillar_name) {
                  return (
                    <>
                      <div className="pl-4 overflow-hidden">
                        <span>Objectives</span>
                      </div>
                      <div className="flex overflow-x-auto w-500">
                        <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
                          <div className="pb-2">
                            <span className="whitespace-normal">
                              {grade.objective}
                            </span>
                          </div>
                          <div className="bg-white rounded-md shadow">
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <td>
                                    <div className="flex justify-center p-2 font-semibold">KPIs</div>
                                  </td>
                                  <td>
                                    <div className="flex justify-center p-2 font-semibold">Results</div>
                                  </td>
                                  <td>
                                    <div className="flex justify-center p-2 font-semibold">Description</div>
                                  </td>
                                  <td>
                                    <div className="flex justify-center p-2 font-semibold">Remarks</div>
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="whitespace-normal p-2">
                                      {grade.kpi_desc}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="p-2 flex items-center justify-center">
                                      {grade.fq_results}
                                      {/* <select className="bg-default rounded-md px-4">
                                        <option value="0" default></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                      </select> */}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="whitespace-normal p-2">
                                      {grade.kpi_desc}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="whitespace-normal p-2">
                                      {grade.fq_remarks === "" ? "N/A" : grade.fq_remarks}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>






                          </div>
                        </div>
                      </div>



                    </>

                  )
                }
              }

              )}
            </div>
          ))}
          {/* {grades.map((grade) => (
            <div className="bg-white w-full rounded-md p-2 mb-4">
              <div className="w-full">
                <span className="text-black font-semibold">
                  {grade.pillar_name}
                </span>
              </div>
              <div className="pl-4 overflow-hidden">
                <span>Objectives</span>
              </div>
            </div>
          ))} */}












        </div>
      )}









      {/* Financial/Bottomline */}
      <div className="bg-white w-full rounded-md p-2 mb-4">
        <div className="w-full">
          <span className="text-black font-semibold">
            Financial/Bottomline(Performance Excellence) - 25%
          </span>
        </div>
        <div className="pl-4 overflow-hidden">
          <span>Objectives</span>
        </div>
        <div className="flex overflow-x-auto w-500">
          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Customer Delight */}
      <div className="bg-white w-full rounded-md p-2 mb-4">
        <div className="w-full">
          <span className="text-black font-semibold">
            Customer Delight(Elevate Customer) - 25%
          </span>
        </div>
        <div className="pl-4 overflow-hidden">
          <span>Objectives</span>
        </div>
        <div className="flex overflow-x-auto w-500">
          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Operational Excellence */}
      <div className="bg-white w-full rounded-md p-2 mb-4">
        <div className="w-full">
          <span className="text-black font-semibold">
            Operational Excellence(Agility in Innovation) - 25%
          </span>
        </div>
        <div className="pl-4 overflow-hidden">
          <span>Objectives</span>
        </div>
        <div className="flex overflow-x-auto w-500">
          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Organizational Capacity */}
      <div className="bg-white w-full rounded-md p-2 mb-4">
        <div className="w-full">
          <span className="text-black font-semibold">
            Organizational Capacity(Learning and Development) - 25%
          </span>
        </div>
        <div className="pl-4 overflow-hidden">
          <span>Objectives</span>
        </div>
        <div className="flex overflow-x-auto w-500">
          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-default-dark flex-none bg-gray-200 p-2 m-2 w-[35rem] rounded-md">
            <div className="pb-2">
              <span className="whitespace-normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates reprehenderit debitis architecto eveniet facilis
                odio aperiam velit ipsum nobis. Commodi.
              </span>
            </div>
            <div className="bg-white rounded-md shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">KPIs</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Results</div>
                    </td>
                    <td>
                      <div className="flex justify-center p-2 font-semibold">Description</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                    <td>
                      <div className="p-2">
                        <select className="bg-default rounded-md px-4">
                          <option value="0" default></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-normal p-2">
                        Lorem ipsum dolor sit amet, cu agam ullamcorper
                        delicatissimi
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AssessmentInstructions />
      <div className="w-full flex justify-end pt-4">
        <a className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed">
          Submit
        </a>
      </div>
    </>
  );
}