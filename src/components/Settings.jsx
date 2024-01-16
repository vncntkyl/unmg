import React, { useEffect, useState } from "react";
import { IoIosUnlock, IoIosLock } from "react-icons/io";
import { useAuth } from "../context/authContext";
import classNames from "classnames";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import format from "date-fns/format";
import { FiPlus, FiEdit } from "react-icons/fi";
import SettingsModal, { EditSettingsModal } from "../misc/SettingsModal";

export default function Settings() {
  const { globalSettings, kpiDurations } = useAuth();
  const [loading, toggleLoading] = useState(true);
  const [settings, setSettings] = useState(globalSettings);
  const [duration, setDuration] = useState(kpiDurations);
  const [pillarRestrictions, setPillarRestrictions] = useState(false);
  const [objectivesRestrictions, setObjectivesRestrictions] = useState(false);
  const [durationModal, setDurationModal] = useState(false);
  const [editDurationModal, setEditDurationModal] = useState(false);

  useEffect(() => {
    if (globalSettings) {
      setSettings(globalSettings);
      toggleLoading(false);
    }
    if (kpiDurations) {
      setDuration(kpiDurations);
      toggleLoading(false);
    }
  }, [globalSettings, kpiDurations]);
  const handleSettings = (field, value) => {
    const updatedSettings = { ...settings };
    updatedSettings[field] = value;
    setSettings(updatedSettings);
    if (updatedSettings.pillar_min > updatedSettings.pillar_max) {
      setPillarRestrictions(true);
    } else {
      setPillarRestrictions(false);
    }
    if (updatedSettings.required_min > updatedSettings.required_max) {
      setObjectivesRestrictions(true);
    } else {
      setObjectivesRestrictions(false);
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    const pillar_min = settings.pillar_min;
    const pillar_max = settings.pillar_max;
    const required_min = settings.required_min;
    const required_max = settings.required_max;
    const overall_percentage = settings.overall_percentage;
    const goal_status = settings.goal_status;
    const fData = new FormData();
    fData.append("submit", true);
    fData.append("pillar_min", pillar_min);
    fData.append("pillar_max", pillar_max);
    fData.append("required_min", required_min);
    fData.append("required_max", required_max);
    fData.append("overall_percentage", overall_percentage);
    fData.append("goal_status", goal_status);
    axios
      .post(url.updateSettings, fData)
      .then((response) => {
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => alert(error));
  };
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div>
        <span className="ml-2">
          In this section, you'll find options and controls to modify and
          customize the system settings according to your preferences or
          requirements.
        </span>
        <span className="block mt-4 text-[1.2rem]">Work Year Duration</span>
        <div className="w-80 my-4">
          <div className="mb-4 flex gap-2 items-center justify-start">
            <div className="relative">
              <button
                className="p-2 px-4 rounded-md text-white bg-un-blue-light hover:bg-un-blue peer"
                type="button"
                onClick={() => {
                  setDurationModal(true);
                }}
              >
                <FiPlus />
              </button>
              <span className="absolute hidden bg-white px-2 py-1 whitespace-nowrap rounded-md shadow peer-hover:block">
                Add new KPI work year
              </span>
            </div>
            {durationModal && <SettingsModal closeModal={setDurationModal} />}
            <div
              className={classNames(
                "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
                durationModal === false && "z-[-1] hidden pointer-events-none"
              )}
              onClick={() => {
                setDurationModal(false);
              }}
            />
            <div className="relative">
              <button className="p-2 px-4 rounded-md text-white bg-un-red-light hover:bg-un-red peer"
                type="button"
                onClick={() => setEditDurationModal(true)}>
                <FiEdit />
              </button>
              <span className="absolute hidden bg-white px-2 py-1 whitespace-nowrap rounded-md shadow peer-hover:block">
                Edit existing KPI work years
              </span>
            </div>
            {editDurationModal && <EditSettingsModal closeModal={setEditDurationModal}  KPI={duration} />}
            <div
              className={classNames(
                "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
                editDurationModal === false && "z-[-1] hidden pointer-events-none"
              )}
              onClick={() => {
                setEditDurationModal(false);
              }}
            />
          </div>

          <div className="h-[10rem] overflow-y-auto">
            {duration.map((duration) => (
              <span className="block text-center">
                {format(new Date(duration.from_date), "MMM d, yyyy")} -{" "}
                {format(new Date(duration.to_date), "MMM d, yyyy")}
              </span>
            ))}
          </div>
        </div>

        <div className="text-[0.8rem]">
          This is where you can set the start and end dates of the kpi year
          duration.
        </div>
        <span className="block mt-4 text-[1.2rem]">Performance Plan</span>
        <span className="block text-[1.2rem] ml-2">Pillar Settings</span>
        <div className="ml-2 flex justify-between border-b-[1px] border-gray-400/50">
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label For="minimum_pillar_percentage" className="text-[1rem]">
                  Min
                </label>
                <input
                  type="number"
                  id="minimum_pillar_percentage"
                  className={classNames(
                    "outline-none bg-default overflow-hidden rounded-md p-1 w-[5ch]",
                    pillarRestrictions
                      ? "border border-un-red-light text-un-red-light"
                      : ""
                  )}
                  value={settings.pillar_min || null}
                  onChange={(event) =>
                    handleSettings("pillar_min", event.target.value)
                  }
                />
                %
              </div>
              <div className="flex items-center gap-2">
                <label For="maximum_pillar_percentage" className="text-[1rem]">
                  Max
                </label>
                <input
                  type="number"
                  id="maximum_pillar_percentage"
                  className={classNames(
                    "outline-none bg-default overflow-hidden rounded-md p-1 w-[5ch]",
                    pillarRestrictions
                      ? "border border-un-red-light text-un-red-light"
                      : ""
                  )}
                  value={settings.pillar_max || null}
                  onChange={(event) =>
                    handleSettings("pillar_max", event.target.value)
                  }
                />
                %
              </div>
            </div>
            {pillarRestrictions && (
              <span className="text-[0.8rem] text-un-red-light">
                The minimum should not exceed the maximum
              </span>
            )}
            <label For="pillar_percentage" className="text-[0.8rem]">
              This is where you would set the minimum and maximum pillar
              percentage of the pillars.
            </label>
          </div>
        </div>
        <span className="block mt-6 ml-2 text-[1.2rem]">
          Required Objectives
        </span>
        <div className="ml-2 flex justify-between border-b-[1px] border-gray-400/50">
          <div className="flex flex-col gap-2 my-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label
                  For="minimum_required_objectives"
                  className="text-[1rem]"
                >
                  Minimum per pillar
                </label>
                <input
                  type="number"
                  id="minimum_required_objectives"
                  className={classNames(
                    "outline-none bg-default overflow-hidden rounded-md p-1 w-[5ch]",
                    objectivesRestrictions
                      ? "border border-un-red-light text-un-red-light"
                      : ""
                  )}
                  value={settings.required_min || null}
                  onChange={(event) =>
                    handleSettings("required_min", event.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label
                  For="maximum_required_objectives"
                  className="text-[1rem]"
                >
                  Overall maximum no of objectives
                </label>
                <input
                  type="number"
                  id="maximum_required_objectives"
                  className={classNames(
                    "outline-none bg-default overflow-hidden rounded-md p-1 w-[5ch]",
                    objectivesRestrictions
                      ? "border border-un-red-light text-un-red-light"
                      : ""
                  )}
                  value={settings.required_max}
                  onChange={(event) =>
                    handleSettings("required_max", event.target.value)
                  }
                />
              </div>
            </div>
            {objectivesRestrictions && (
              <span className="text-[0.8rem] text-un-red-light">
                The minimum should not exceed the maximum
              </span>
            )}
            <label For="required_objectives" className="text-[0.8rem]">
              This is the section where you can specify the number of required
              objectives for each pillar.
            </label>
          </div>
        </div>
        <span className="block mt-6 ml-2 text-[1.2rem]">
          Overall Adaptive Percentage
        </span>
        <div className="ml-2 flex justify-between border-b-[1px] border-gray-400/50">
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label
                  For="minimum_required_objectives"
                  className="text-[1rem]"
                >
                  Overall Percentage
                </label>
                <input
                  type="number"
                  id="minimum_required_objectives"
                  className="outline-none bg-default overflow-hidden rounded-md p-1 w-[4ch]"
                  value={settings.overall_percentage || null}
                  onChange={(event) =>
                    handleSettings("overall_percentage", event.target.value)
                  }
                />
                <label className="text-[1rem]">%</label>
              </div>
            </div>
            <label For="required_objectives" className="text-[0.8rem]">
              This is where you will set the no, of overall percentage across
              the pillars.
            </label>
          </div>
        </div>
        <span className="block mt-6 ml-2 text-[1.2rem]">
          Lock and Unlock Form
        </span>
        <div className="ml-2 flex justify-between">
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center">
              <IoIosUnlock className="text-[1.5rem] mr-2" />
              <label class="relative inline-flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={
                    settings.goal_status === "1" || settings.goal_status === 1
                  }
                  className="sr-only peer"
                  onChange={(event) =>
                    handleSettings("goal_status", event.target.checked ? 1 : 0)
                  }
                />
                <div class="border-[1px] peer-checked:bg-un-blue w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <IoIosLock className="text-[1.5rem]" />
              </label>
            </div>
            <label For="required_objectives" className="text-[0.8rem]">
              This is where you can lock and unlock the whole performance plan
              tab
            </label>
          </div>
        </div>
        <div className="w-full flex justify-end pt-4">
          <button
            className={classNames(
              "p-1 rounded-md text-white",
              pillarRestrictions || objectivesRestrictions
                ? "bg-mid-gray"
                : "bg-un-blue-light hover:bg-un-blue"
            )}
            type="submit"
            onClick={handleSave}
            disabled={
              pillarRestrictions || objectivesRestrictions ? true : false
            }
          >
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
