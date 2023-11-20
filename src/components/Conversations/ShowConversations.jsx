import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function ShowConversations({ user_id }) {
    return (
        <>
            <div className="h-[47.5rem]">
                <div className="flex justify-end">
                    <button className="bg-mid-gray px-4 py-2 rounded-md text-white hover:bg-dark-gray flex items-center justify-center gap-2"><FaPencilAlt />Compose</button>
                </div>
            </div>
        </>
    );
}