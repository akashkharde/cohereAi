import { IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center h-screen">
      <div className="flex-1 items-center flex flex-col gap-5 justify-center max-w-[600px] px-5 text-center">
        <h3 className="sm:text-[40px] text-[25px] text-gray-600 font-light">
          👋🏻 Welcome!
        </h3>
        <p className="font-normal sm:text-base text-sm">
          Cohere is an AI-powered platform that provides Natural Language
          Processing (NLP) tools for developers to integrate language
          understanding into their applications. The platform focuses on text
          generation, semantic understanding, and language representation,
          offering APIs that allow developers to leverage these capabilities for
          tasks like generating text, understanding context, and performing
          classification.
        </p>
      </div>
      <div className="sm:mb-20 mb-8">
        <button
          className="text-white bg-green-500 sm:px-6 px-4 sm:py-3 py-2 sm:text-[18px] text-base rounded-lg font-semibold flex items-center gap-2"
          onClick={() => navigate("/chat")}
        >
          Enter CoHere demo{" "}
          <IoChevronForwardOutline className="translate-y-[1px]" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
