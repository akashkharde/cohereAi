import { useNavigate } from "react-router-dom";
import { SidebarInterface } from "./type";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar: React.FC<SidebarInterface> = ({
  open,
  setOpen,
  chatHistory,
  onNewChat,
  handleDeleteChat,
  activeChatId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${open ? "hidden" : "md:hidden"} bg-black bg-opacity-50 fixed top-0 left-0 h-full w-full z-10`} onClick={()=>setOpen(!open)} />
      <div
        className={`${
          open
            ? "md:translate-x-0 -translate-x-full"
            : "md:-translate-x-full translate-x-0"
        } z-10 fixed h-full w-[250px] p-4 bg-gray-800 text-white flex flex-col transition-all`}
      >
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-semibold text-center">Chats</h2>
          <button className="text-[25px]" onClick={() => setOpen(!open)}>
            <HiMenuAlt3 />
          </button>
        </div>
        <button
          onClick={onNewChat}
          className="w-full mb-4 border border-white p-2 rounded-lg text-center flex items-center gap-3 justify-center text-sm"
        >
          <FiEdit className="text-white" />
          New Chat
        </button>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {chatHistory.map((history) => {
              return (
                <div
                  key={history.id}
                  className={`${
                    history.id === activeChatId ? "bg-gray-700" : ""
                  } bg-opacity-70 hover:bg-gray-700 flex justify-between rounded-md py-1 px-2 text-[15px] transition-all`}
                >
                  <button
                    onClick={() => navigate(`/chat/${history.id}`)}
                    className="w-full text-start font-normal text-ellipsis overflow-hidden whitespace-nowrap pr-2"
                  >
                    {history.title}
                  </button>
                  <button
                    onClick={() => handleDeleteChat(history.id)}
                    className="text-red-500 text-[16px]"
                    aria-label="Delete chat"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
