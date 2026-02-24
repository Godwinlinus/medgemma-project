import PatientRow from "./PatientRow";

const PatientQueue = () => {
    const patients = [
        {
            id: 1,
            initials: "JD",
            name: "J. Doe",
            age: 45,
            status: "High Priority",
            note: "Waiting for clinical review • 12m",
            action: "assignment",
        },
        {
            id: 2,
            initials: "AS",
            name: "A. Smith",
            age: 29,
            status: "Stable",
            note: "Vitals logged via MedGemma • 45m",
            action: "check",
        },
        {
            id: 3,
            initials: "RK",
            name: "R. Khan",
            age: 62,
            status: "Stable",
            note: "Discharge protocol pending • 1h",
            action: "logout",
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Patient Queue</h2>
                <button className="text-sm font-semibold text-primary hover:underline">
                    See All →
                </button>
            </div>

            <div className="space-y-3">
                {patients.map((patient) => (
                    <div className="bg-surface-light dark:bg-surface-dark">
                        <PatientRow key={patient.id} {...patient}  />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientQueue;
