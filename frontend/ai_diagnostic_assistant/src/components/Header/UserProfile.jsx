import React from "react";

const UserProfile = ({ name, role, avatar }) => {
    return (
        <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
            <p className="text-[10px] font-semibold text-textPrimary">{name}</p>
            <p className="text-[8px] text-textMuted uppercase tracking-wider">
            {role}
            </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-surface overflow-hidden border-2 border-primary/20">
            <img
            alt={`${name} profile`}
            className="w-full h-full object-cover"
            src={avatar}
            />
        </div>
        </div>
    );
};

export default UserProfile;
