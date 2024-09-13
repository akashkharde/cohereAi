import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HeaderInterface } from "./type";

const Header: React.FC<HeaderInterface> = ({ open, setOpen }) => {
  return (
    <div className="bg-gray-300 w-full py-4 px-5">
      <div className="flex items-center gap-5">
        <div className={`${open ? "md:hidden flex" : "md:flex hidden"}`}>
          <button onClick={() => setOpen(!open)}>
            <HiOutlineMenuAlt1 className="text-[22px] text-gray-700" />
          </button>
        </div>
        <div>
          <h3 className="text-[20px] font-semibold text-gray-700">
            CoHere demo
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
