import React from "react";
import { FaPencilAlt, FaInbox, FaRegTrashAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
export default function Discussions() {
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
    },
    {
      name: 'Michael',
      subject: 'Seeking Professional Advice',
      message: 'Hi Michael, I\'ve been following your career in financial analysis with great interest. I\'d appreciate your advice on navigating the complexities of investment strategies. Your expertise would be immensely valuable. Thank you, [Your Name]'
    },
    {
      name: 'Charlotte',
      subject: 'Collaborative Writing Proposal',
      message: 'Hello Charlotte, your eloquence in writing is impressive. I\'m proposing a joint writing project exploring themes of social change. Your unique perspective would greatly enrich our collaboration. Excited to discuss this further. Warm regards, [Your Name]'
    },
    {
      name: 'James',
      subject: 'Feedback on Creative Work',
      message: 'Hi James, I admire your artistic talent and creativity. I\'d appreciate your feedback on my recent portfolio showcasing graphic design projects. Your insights would be invaluable. Thank you in advance. Best regards, [Your Name]'
    },
    {
      name: 'Isabella',
      subject: 'Networking Request',
      message: 'Hello Isabella, I\'ve heard about your expertise in digital marketing. I\'d love to connect and exchange insights about the latest trends in online advertising. Let\'s arrange a time to discuss further. Regards, [Your Name]'
    },
    {
      name: 'William',
      subject: 'Mentorship Opportunity',
      message: 'Hi William, your enthusiasm for learning new technologies is remarkable. I\'d like to offer mentorship to help guide you through the intricacies of software development. Looking forward to sharing knowledge with you. Warm regards, [Your Name]'
    },
    {
      name: 'Emma',
      subject: 'Recognition for Professional Skills',
      message: 'Hello Emma, your leadership skills in project management are truly impressive. Your contributions have been invaluable to the team. Thank you for your dedication and hard work. Sincerely, [Your Name]'
    },
    {
      name: 'Noah',
      subject: 'Congrats on Academic Excellence',
      message: 'Hi Noah, congratulations on your outstanding performance in your recent academic endeavors. Your dedication to academic excellence is commendable. Keep up the fantastic work! Best wishes, [Your Name]'
    },
    {
      name: 'Olivia',
      subject: 'Seminar Invitation',
      message: 'Hello Olivia, your passion for environmental sustainability is inspiring. We\'re organizing a seminar on "Green Initiatives in Urban Planning" and your expertise would greatly contribute to the discussion. Hoping to see you there. Regards, [Your Name]'
    },
    {
      name: 'Liam',
      subject: 'Partnership Opportunity',
      message: 'Hi Liam, I\'ve been following your work in software development and find it highly innovative. Let\'s explore the possibility of partnering on a project to develop cutting-edge applications. Excited to discuss this prospect with you. Warm regards, [Your Name]'
    },
    {
      name: 'Sophia',
      subject: 'Research Collaboration Proposal',
      message: 'Hi Sophia, I admire your expertise in data analysis. I\'m proposing a collaborative research effort to explore emerging trends in machine learning algorithms. Your insights would be invaluable. Looking forward to discussing this further. Best regards, [Your Name]'
    }
  ]
  return (
    <>
      <div className="w-full mt-4">
        <div className="flex">
          <span className="ml-2 flex items-center justify-center gap-2 bg-default px-2 rounded-t-md"><FaInbox />Inbox</span>
          <span className="flex items-center justify-center gap-2 px-2"><IoMdSend />Sent</span>
        </div>
        <div className="w-full h-[90%] border border-default-dark rounded-md p-2 overflow-scroll">
          {messages.map((msg, idx) => {
            return (
              <>
                <div className="relative group/item w-full flex border-b border-default-dark hover:bg-default py-2">
                  <span className="lg:mx-2 hidden md:block text-[0.9rem]">{idx + 1}</span>
                  <span className="hidden md:block mx-2 font-semibold lg:whitespace-nowrap px-10 min-w-[150px] text-[.8rem]">{msg.name}</span>
                  <div className="flex flex-col">
                    <span className="lg:mx-2 font-semibold lg:whitespace-nowrap overflow-x-hidden text-left text-[.8rem]">{msg.subject}</span>
                    <span className="lg:mx-2 w-[8rem] sm:w-[15rem] lg:w-[10rem] whitespace-nowrap overflow-x-hidden text-[0.6rem] text-mid-gray lg:text-[0.8rem]">{msg.message}...</span>
                  </div>
                  <div className="w-full flex justify-end items-center"><span className="hidden group-hover/item:block px-2"><FaRegTrashAlt /></span><span className="flex flex-col lg:flex-row lg:gap-2 group-hover/item:hidden px-2 text-[0.8rem] whitespace-nowrap"><span>11/24/23</span><span className="text-[0.6rem] lg:text-[0.8rem] text-right">09:00 PM</span></span></div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  );
}
