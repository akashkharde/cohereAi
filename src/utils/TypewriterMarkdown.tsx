import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { copyToClipboard } from "./copytoclipboard";
import { FaRegCopy } from "react-icons/fa";
import { CodeBlockInterface, TypewriterMarkdownInterface } from "./type";

const TypewriterMarkdown: React.FC<TypewriterMarkdownInterface> = ({
  text,
  speed = 20,
  isNew = true,
}) => {
  const [displayedText, setDisplayedText] = useState<string>(isNew ? "" : text);
  const [index, setIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTypingEffect = () => {
    if (index < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else {
      setIsComplete(true);
    }
  };
  

  // Reset the component state when text or isNew changes
  useEffect(() => {
    if (isNew) {
      setDisplayedText("");
      setIndex(0);
      setIsComplete(false);
      // Clear previous timer if exists
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      setDisplayedText(text);
      setIndex(text?.length);
      setIsComplete(true);
    }
  }, [text, isNew]);
  

  // Trigger typing effect only if isNew and text changes
  useEffect(() => {
    if (isNew && index < text.length) {
      handleTypingEffect();
    }
  }, [index, isNew, text, speed]);

  // Code block rendering with copy functionality
  const renderCodeBlock = ({
    inline,
    className,
    children,
    ...props
  }: CodeBlockInterface) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const codeString = String(children).replace(/\n$/, "");

    return !inline && match ? (
      <div className="relative my-5 max-w-[600px] w-full overflow-x-auto">
        <div className="flex justify-between w-full px-3 py-1 text-white bg-gray-500 relative z-1 -mb-4 rounded-t-md">
          <div>{language}</div>
          <button
            onClick={() => copyToClipboard(codeString)}
            className={`font-normal text-sm items-center gap-2 font-sans ${
              isComplete ? "flex" : "hidden"
            }`}
            disabled={!isComplete}
          >
            <FaRegCopy className="text-base" />
            Copy code
          </button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          PreTag="div"
          {...props}
          className="w-full max-w-full overflow-x-auto"
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="hello" {...props}>
        {children}
      </code>
    );
  };

  return (
    <ReactMarkdown
      components={{
        code: renderCodeBlock,
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};

export default TypewriterMarkdown;
