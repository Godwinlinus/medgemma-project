import { 
    MdOutlineZoomIn,
    MdOutlineContrast,
    MdOutlineArrowBack 
 } from "react-icons/md";
import { Link, useNavigate } from "react-router";

const ImagingHeader = () => (
  <div className="flex items-center justify-between">
    <div className="flex gap-4 items-center">
      <Link to="/ai-assistant">
      <MdOutlineArrowBack 
        className="text-xl hover:text-primary cursor-pointer"
      />
      </Link>
      
      <h2 className="text-[10px] font-bold uppercase tracking-widest">
        Input Source
      </h2>
      
    </div>
    

    <div className="flex gap-2">
       <MdOutlineZoomIn className="text-xl hover:text-primary cursor-pointer " />
       <MdOutlineContrast className="text-xl hover:text-primary cursor-pointer" />
    </div>
  </div>
);

export default ImagingHeader;
