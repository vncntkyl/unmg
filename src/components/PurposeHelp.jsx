import React from "react";

export default function PurposeHelp() {
  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <section>
          <span className="font-semibold text-[1.2rem]">Purpose</span>
          <div>
            Review of performance semi-annually provides an objective or a sense
            of focus on the key performance, achievement of key business goals,
            and development issues. Performance review meetings form the basis
            for enabling both the managers and the individual staff to
            positively explore ways for improving the performance in the near
            future and to identify solutions for resolving the issues which come
            in the way of attainment of predetermined performance standards.
          </div>
        </section>
        <section>
          <span className="font-semibold">Performance Dimensions</span>
          <div>
            <div>
              <span className="underline">Key Performance Indicators(KPIs)</span>
              <ul className="list-disc pl-8">
                <li>
                  These are the results that the employee needs to produce or
                  deliver. KPIs are a quantifiable or measurable value that
                  reflects a business goal or objective (strategic) and how
                  successful the business is in accomplishing that goal or
                  objective.
                </li>
                <li>
                  In UNMG, we follow the 4 Perspectives of the Balance Scorecard
                  with a minimum of 3 KPIs per perspective (if applicable). The
                  distribution of the weight per perspective depends on the
                  nature of the job (e.g. Sales job understandably has a
                  weightier % for Financial/ Bottom Line results). However, the
                  lowest percentage weight for any perspective should be at a
                  minimum 15% to ensure that we don't neglect any perspective.
                </li>
                <li>
                  People Managers have a special set of Learning and Development
                  indicators. This is unique to them as these indicators spell
                  out how they lead, develop, care and motivate their people/
                  team.
                </li>
              </ul>
            </div>
            <div>
              <span className="underline">Behavioral Indicators (Competencies)</span>
              <ul className="list-disc pl-8">
                <li>
                  This is how an employee is expected to behave in the conduct
                  of his duties and responsibilities. Competencies are
                  observable behaviors that successful performers demonstrate on
                  the job. These behaviors are aligned with our 5 Core Values.
                </li>
                <li>
                  The Behavioral Indicators portion includes a Learning and
                  Development Plan which allows the employees to come up with a
                  plan on how to develop a specific competency area. To ensure a
                  focused approach, the employee should focus on a maximum of 3
                  Priorities only. Main consideration for prioritization are
                  competencies which are rated low.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <span className="font-semibold">Performance Evaluation Cycle</span>
          <p>
            The KPI portion follows a quarterly cadence. It kickstarts with the
            Performance Planning at the start of the year. Then you have an
            evaluation beginning with the second quarter, mid-year, 3rd quarter
            and year-end.
          </p>
          &nbsp;
          <p>
            The Behavioral portion follows a semi-annual cadence. It kickstarts
            with a Pre-Assessment and Learning and Development Planning. Then
            you have a midyear and Year-end assessment.
          </p>
        </section>
      </div>
    </>
  );
}
