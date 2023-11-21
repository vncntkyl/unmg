import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaInbox, FaRegTrashAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import classNames from "classnames";


export default function ShowConversations({ user_id }) {
    const [tabs, setTabs] = useState(false);
    const messages = [
        {
            name: 'John',
            subject: 'Regarding Math Assignment',
            message: 'Dear John, I hope this email finds you well. I wanted to discuss the recent math assignment on Algebraic equations and their applications. Please find attached detailed feedback on your work. Let me know if you have any questions or need further clarification. Best regards, [Your Name]'
        },
        {
            name: 'Emily',
            subject: 'French Revolution Research Paper',
            message: 'Hi Emily, I trust you are doing great. I\'ve reviewed your research paper on The French Revolution and its impact on Europe. It\'s an impressive piece of work! I\'ll be sending you some additional feedback shortly. Keep up the excellent work. Regards, [Your Name]'
        },
        {
            name: 'Michael',
            subject: 'Biology Project Analysis',
            message: 'Hello Michael, I hope you\'re having a productive day. Your biology project analysis on cellular structure and its functions in living organisms was quite insightful. I have some additional resources that might interest you. Let me know if you\'d like me to share them with you. Warm regards, [Your Name]'
        },
        {
            name: 'Sarah',
            subject: 'Literature Discussion',
            message: 'Hi Sarah, I trust this message finds you in high spirits. Your recent analysis of Shakespearean plays and their themes was thought-provoking. I have some ideas for further exploration on this topic. Let\'s discuss it further at our next meeting. Best regards, [Your Name]'
        },
        {
            name: 'David',
            subject: 'Physics Study Group',
            message: 'Dear David, I hope you\'re doing well. Let\'s organize a study group session soon to delve deeper into Newtonian mechanics and laws of motion. I believe collaborative learning will enhance our understanding of this subject. Looking forward to your response. Regards, [Your Name]'
        },
        {
            name: 'Sophia',
            subject: 'Computer Science Project Collaboration',
            message: 'Hi Sophia, I trust you\'re doing great. Your understanding of algorithms and data structures is impressive. I propose collaborating on a project to implement some of these concepts practically. Let me know your thoughts. Best regards, [Your Name]'
        },
        {
            name: 'Daniel',
            subject: 'Chemistry Experiment Discussion',
            message: 'Hello Daniel, I hope this message finds you well. Your recent experiment on chemical reactions and their kinetics was fascinating. Let\'s schedule a meeting to discuss the outcomes and plan the next steps. Looking forward to our discussion. Warm regards, [Your Name]'
        },
        {
            name: 'Olivia',
            subject: 'Geography Research Proposal',
            message: 'Dear Olivia, I trust you\'re doing well. Your study of landforms and their geographical significance has immense potential. Let\'s refine your research proposal and discuss potential avenues for exploration. Excited to hear your thoughts. Regards, [Your Name]'
        },
        {
            name: 'William',
            subject: 'Art Appreciation Seminar',
            message: 'Hi William, I hope this message finds you inspired. Your exploration of different art movements throughout history is commendable. Let\'s plan an art appreciation seminar together to share our insights with others. Looking forward to your response. Warm regards, [Your Name]'
        },
        {
            name: 'Ava',
            subject: 'Economics Discussion Forum',
            message: 'Hello Ava, I trust you\'re having a productive day. Your understanding of macro and microeconomic principles in global markets is impressive. Let\'s initiate a discussion forum to exchange ideas and viewpoints on this subject. Regards, [Your Name]'
        }
    ]
    return (
        <>
            <div className="h-[47.5rem]">
                <div className="flex">
                    <span className="ml-2 flex items-center justify-center gap-2 bg-default px-2 rounded-t-md"><FaInbox />Inbox</span>
                    <span className="flex items-center justify-center gap-2 px-2"><IoMdSend />Sent</span>
                </div>
                <div className="h-full outline outline-1 outline-mid-gray rounded-md p-2">
                    <div className="flex justify-end mb-2">
                        <button className="bg-mid-gray px-4 py-2 rounded-md text-white hover:bg-dark-gray flex items-center justify-center gap-2"><FaPencilAlt />Compose</button>
                    </div>
                    {messages.map((msg, idx) => {
                        return <div className="group/item w-full flex border-b border-default-dark hover:bg-default py-2">
                            <span className="mx-2">{idx + 1}</span>
                            <span className="mx-2 font-semibold whitespace-nowrap px-10 min-w-[150px] text-[.8rem]">{msg.name}</span>
                            <span className="mx-2 font-semibold whitespace-nowrap text-left text-[.8rem]">{msg.subject}</span>
                            <span className="mx-2">-</span>
                            <span className="mx-2 whitespace-nowrap text-[0.8rem]">{msg.message.substring(0, 70)}...</span>
                            <div className="w-full flex justify-end items-center"><span className="invisible group-hover/item:visible px-2"><FaRegTrashAlt /></span><span className="visible group-hover/item:invisible px-2 text-[0.8rem]">9:00 PM</span></div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}