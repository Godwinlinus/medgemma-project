import { useState } from "react";
import { MdVerified, MdLocationOn, MdBadge } from "react-icons/md";

const ProfileHeader = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  const handleSave = () => {
    setIsEditing(false);
    onUpdateProfile(localProfile);
  };

  return (
    <div className="bg-card-dark border border-border-dark rounded-xl p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
        <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full border-4 border-primary/20 bg-cover bg-center"
              style={{ backgroundImage: `url(${localProfile.image})` }}
              alt={localProfile.name}
            />
            {localProfile.verified && (
              <div className="absolute bottom-1 right-1 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center border-4 border-card-dark" title="Verified Professional">
                <MdVerified className="text-sm" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {isEditing ? (
              <>
                <input
                  className="text-white text-3xl font-bold tracking-tight bg-surface-dark rounded px-2 py-1 mb-1"
                  value={localProfile.name}
                  onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                />
                <input
                  className="text-primary text-lg font-medium bg-surface-dark rounded px-2 py-1"
                  value={localProfile.title}
                  onChange={(e) => setLocalProfile({ ...localProfile, title: e.target.value })}
                />
              </>
            ) : (
              <>
                <h1 className="text-white text-3xl font-bold tracking-tight">{localProfile.name}</h1>
                <p className="text-primary text-lg font-medium">{localProfile.title}</p>
              </>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              {localProfile.location && (
                isEditing ? (
                  <input
                    className="bg-background-dark/50 text-slate-400 text-sm rounded-full px-3 py-1"
                    value={localProfile.location}
                    onChange={(e) => setLocalProfile({ ...localProfile, location: e.target.value })}
                  />
                ) : (
                  <span className="flex items-center gap-1 text-slate-400 text-sm bg-background-dark/50 px-3 py-1 rounded-full">
                    <MdLocationOn className="text-xs" /> {localProfile.location}
                  </span>
                )
              )}
              {localProfile.license && (
                isEditing ? (
                  <input
                    className="bg-background-dark/50 text-slate-400 text-sm rounded-full px-3 py-1"
                    value={localProfile.license}
                    onChange={(e) => setLocalProfile({ ...localProfile, license: e.target.value })}
                  />
                ) : (
                  <span className="flex items-center gap-1 text-slate-400 text-sm bg-background-dark/50 px-3 py-1 rounded-full">
                    <MdBadge className="text-xs" /> {localProfile.license}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {isEditing ? (
            <button
              className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="flex-1 md:flex-none px-6 py-2.5 bg-border-dark text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all">
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
