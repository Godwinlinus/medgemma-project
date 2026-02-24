import { useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfessionalCredentials from "../components/Profile/ProfessionalCredentials";
import RecentActivity from "../components/Profile/RecentActivity";
import Achievements from "../components/Profile/Achievements";
import ImpactStats from "../components/Profile/ImpactStats";
import Header from "../components/Header/Header";
import Aside from "../components/sideBar/Aside";

const DashboardPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Jenkins, MD",
    title: "Senior Radiologist | Mayo Clinic",
    image:
      "",
    verified: true,
    location: "Rochester, MN",
    license: "License #123456789",
  });

  const [credentials, setCredentials] = useState([
    { title: "NPI Number", value: "1098765432" },
    { title: "Board Certification", value: "American Board of Radiology (ABR)" },
    { title: "Medical School", value: "Johns Hopkins University School of Medicine" },
    { title: "Residency", value: "Mayo Clinic Graduate School of Medicine" },
  ]);

  const activities = [
    {
      type: "radiology",
      title: "Chest X-Ray Analysis - Patient #8821",
      meta: "2 hours ago • Primary Diagnosis Confirmed",
      status: "Completed",
      statusColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    },
    {
      type: "psychology",
      title: "MRI Neuro - Case #9920",
      meta: "5 hours ago • Flagged for AI discrepancy",
      status: "Reviewing",
      statusColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    },
    {
      type: "biotech",
      title: "Abdominal CT - Case #1004",
      meta: "Yesterday • Second opinion provided",
      status: "Completed",
      statusColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    },
  ];

  const impactStats = [
    { label: "Diagnostic Accuracy", value: "99.2%" },
    { label: "AI Feedback Loop", value: "87%" },
  ];

  const avgTurnaround = { value: "14.5", unit: "minutes / case" };

  // Update single credential value
  const handleChangeCredential = (index, value) => {
    const updated = [...credentials];
    updated[index].value = value;
    setCredentials(updated);
  };

  // Update profile object
  const handleUpdateProfile = (updatedProfile) => setProfile(updatedProfile);

  return (
    <div className="min-h-screen flex">
      <Aside />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="max-w-5xl mx-auto w-full p-8 flex flex-col gap-8">
          {/* Profile Header with edit toggle */}
          <ProfileHeader profile={profile} onUpdateProfile={handleUpdateProfile} isEditing={isEditing} setIsEditing={setIsEditing} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Credentials section now editable */}
              <ProfessionalCredentials
                credentials={credentials}
                isEditing={isEditing}
                onChangeCredential={handleChangeCredential}
              />
              <RecentActivity activities={activities} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8">
              <Achievements />
              <ImpactStats stats={impactStats} avgTurnaround={avgTurnaround} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
