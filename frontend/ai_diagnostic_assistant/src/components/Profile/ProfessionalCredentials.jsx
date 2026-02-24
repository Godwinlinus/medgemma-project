import CredentialCard from "./CredentialCard";
import EditableCredentialCard from "./EditableCredentialCard";
import { MdSchool } from "react-icons/md";

const ProfessionalCredentials = ({ credentials, isEditing, onChangeCredential }) => (
  <section className="bg-card-dark border border-border-dark rounded-xl overflow-hidden">
    <div className="px-6 pt-6 pb-2">
      <h2 className="text-white text-xl font-bold flex items-center gap-2">
        <MdSchool className="text-primary" /> Professional Credentials
      </h2>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
      {credentials.map((cred, i) =>
        isEditing ? (
          <EditableCredentialCard
            key={i}
            title={cred.title}
            value={cred.value}
            onChange={(val) => onChangeCredential(i, val)}
          />
        ) : (
          <CredentialCard key={i} title={cred.title} value={cred.value} />
        )
      )}
    </div>
  </section>
);

export default ProfessionalCredentials;
