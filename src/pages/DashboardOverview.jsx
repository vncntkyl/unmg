import React, { useState } from "react";
import classNames from "classnames";
import { MainOverview, Overview } from "../components";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardOverview() {
  return (
    <>
      {/* overview */}
      <Overview />
      <div className=" bg-default m-2 flex flex-row gap-2 lg:ml-[18rem] lg:mr-6 xl:ml-[24.5rem] xl:mr-32">
        {/* HEADER */}
        <div className="w-fit bg-white p-2 shadow-md rounded-md">
          <div className="flex items-center pb-2">
            <p className="font-semibold text-black">
              Performance Evaluation Summary
            </p>
          </div>
          <BarChart
            width={600}
            height={350}
            onClick={(e) => console.log(e.activeLabel)}
            data={[
              {
                name: "Not Yet Started",
                [`Regular Employees`]: 150,
                [`Probationary Employees`]: 30,
              },
              {
                name: "Approved Metrics",
                [`Regular Employees`]: 64,
                [`Probationary Employees`]: 24,
              },
              {
                name: "Awaiting Evaluation",
                [`Regular Employees`]: 45,
                [`Probationary Employees`]: 15,
              },
              {
                name: "Approved Evaluation",
                [`Regular Employees`]: 30,
                [`Probationary Employees`]: 10,
              },
            ]}
          >
            Regular Employees Employees
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Regular Employees" fill="#306088" />
            <Bar dataKey="Probationary Employees" fill="#d43953" />
          </BarChart>
        </div>
        <div className="w-fit bg-white p-2 shadow-md rounded-md">
          <div className="flex items-center pb-2">
            <p className="font-semibold text-black">Employees Contract Type</p>
          </div>
          <PieChart width={350} height={350}>
            <Tooltip />
            <Pie
              className="outline-none"
              data={[
                {
                  name: "Regular",
                  value: 219,
                  fill: "#306088",
                },
                {
                  name: "Probationary",
                  value: 38,
                  fill: "#d22735",
                },
                {
                  name: "Project Based",
                  value: 25,
                  fill: "#b4d3fd",
                },
                {
                  name: "Consultant",
                  value: 18,
                  fill: "#FDB4B4",
                },
              ]}
              dataKey="value"
              nameKey="name"
              label={true}
              outerRadius={100}
              fill="#fff"
            />
            <Legend />
          </PieChart>
        </div>
        <div className="w-fit bg-white p-2 shadow-md rounded-md">
          <div className="flex items-center pb-2">
            <p className="font-semibold text-black">Evaluation Discussion</p>
          </div>
          <PieChart width={350} height={350}>
            <Tooltip />
            <Pie
              className="outline-none"
              data={[
                {
                  name: "Goal Setting",
                  value: 27,
                  fill: "#306088",
                },
                {
                  name: "Annual Evaluation",
                  value: 12,
                  fill: "#d22735",
                },
                {
                  name: "Third Month Evaluation",
                  value: 19,
                  fill: "#b4d3fd",
                },
              ]}
              dataKey="value"
              nameKey="name"
              label={true}
              outerRadius={100}
              fill="#fff"
            />
            <Legend />
          </PieChart>
        </div>
      </div>
    </>
  );
}
