import { FaEye } from "react-icons/fa";

const ImagingViewer = ({ src, type }) => (
  <div className="relative flex-1 bg-black rounded-2xl overflow-hidden border border-border-light dark:border-border-dark group">
    <img
      src={src}
      alt={type}
      className="w-full h-full object-contain opacity-90"
    />

    {/* <ImagingMeta type={type} /> */}
    <TbAugmentedReality />
  </div>
);

export default ImagingViewer;
