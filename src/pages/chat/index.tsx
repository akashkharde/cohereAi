import { FaArrowUp } from "react-icons/fa";
import Header from "../../components/header";
import LoadingDots from "../../components/loadingDots";
import TypewriterMarkdown from "../../utils/TypewriterMarkdown";
import Sidebar from "../../components/sidebar";
import { useChat } from "../../components/hooks/useChat";
import { useState } from "react";

const Chat = () => {
  const [open, setOpen] = useState(true);
  const {
    inputText,
    setInputText,
    textareaRef,
    chatContainerRef,
    activeChat,
    chatHistories,
    activeChatId,
    handleGenerate,
    handleNewChat,
    handleDeleteChat,
  } = useChat();

  // Render prompt-response pairs
  const renderResponses = () => {
    return activeChat.map(({ prompt, response, isNew }, index) => (
      <div key={index} className="flex flex-col gap-5 mb-5">
        <div className="flex justify-end text-white">
          <p className="w-fit sm:py-2 py-1.5 sm:px-5 px-4 font-normal rounded-xl bg-gray-500 whitespace-pre-wrap">
            {prompt}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex h-[30px] min-w-[30px] items-center justify-center border-gray-500 border rounded-full text-sm text-gray-500 font-semibold">
            AI
          </div>
          <p className={`translate-y-[3px] text-gray-500`}>
            {response !== null ? (
              <TypewriterMarkdown text={response} speed={5} isNew={isNew} />
            ) : (
              <div className="translate-y-2">
                <span className="text-gray-500">
                  <LoadingDots />
                </span>
              </div>
            )}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex w-full">
      <Sidebar
        open={open}
        setOpen={setOpen}
        chatHistory={chatHistories}
        onNewChat={handleNewChat}
        handleDeleteChat={handleDeleteChat}
        activeChatId={activeChatId}
      />
      <div
        className={`${
          open ? "md:max-w-[calc(100%-250px)] max-w-full" : "max-w-full"
        } h-screen overflow-y-auto flex flex-col w-full transition-all ml-auto`}
      >
        <Header open={open} setOpen={setOpen} />
        {activeChat.length > 0 && (
          <div className="flex-1 lg:px-7 lg:pt-7 px-4 pt-4 overflow-y-auto pb-0">
            <div
              ref={chatContainerRef}
              className="max-w-[700px] overflow-y-auto h-full scroll-smooth mx-auto lg:p-5 sm:p-2 rounded-lg text-gray-800 sm:my-0"
            >
              <div className="sm:my-0 my-3">
                {activeChat.length > 0 && <div>{renderResponses()}</div>}
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            activeChat.length > 0
              ? ""
              : "flex-1 flex items-center flex-col gap-5 justify-center"
          } max-w-[750px] w-full mx-auto p-5 transition-all`}
        >
          {activeChat.length === 0 && (
            <h3 className="text-[20px] font-medium text-gray-500">
              <TypewriterMarkdown text={"Where should we start?"} speed={25} />
            </h3>
          )}
          <form
            onSubmit={handleGenerate}
            className="flex items-center relative bg-gray-200 rounded-xl w-full"
          >
            <textarea
              ref={textareaRef}
              placeholder="Enter a prompt..."
              value={inputText}
              className="bg-gray-200 rounded-xl w-full px-5 py-3 pr-10 focus:outline-none max-h-[45vh] max-w-[calc(100%-50px)] overflow-y-auto whitespace-pre-wrap"
              onChange={(e) => setInputText(e.target.value)}
              rows={1} // Default to 1 row
              style={{ resize: "none",whiteSpace: "pre-wrap" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent adding a new line
                  handleGenerate(e); // Manually submit the form
                }
              }}
            />
            <button
              type="submit"
              className="absolute right-0 bg-gray-500 bottom-0 rounded-[9px] h-[35px] w-[35px] flex items-center justify-center m-1.5"
            >
              <FaArrowUp className="text-[16px] text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
