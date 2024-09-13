import { useEffect, useRef, useState } from "react";
import { generateText } from "../../api/cohereAPI";
import { useNavigate, useParams } from "react-router-dom";
import { ChatHistoryInterface, ChatInterface } from "../../pages/chat/type";

export const useChat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [chatHistories, setChatHistories] = useState<ChatHistoryInterface[]>([]);
  const [activeChat, setActiveChat] = useState<ChatInterface[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  // Scroll to bottom when new responses are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeChat]);

  // Save chat histories to localStorage whenever updated
  useEffect(() => {
    if (chatHistories.length > 0) {
      localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
    }
  }, [chatHistories]);

  // Form submission and text generation
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newPromptResponse: ChatInterface = {
      prompt: inputText,
      response: null,
      isNew: true,
    };

    const updatedChat = [...activeChat, newPromptResponse];
    setActiveChat(updatedChat);
    setInputText("");

    const currentIndex = updatedChat.length - 1;

    try {
      const history = updatedChat.map(
        ({ prompt, response }) => `User: ${prompt}\nAI: ${response || ""}`
      );

      const firstPrompt = updatedChat[0].prompt;
      const getTitle = true;
      let chatTitle = null;

      if (activeChatId !== null) {
        const existingTitle = chatHistories.find(
          (chatHistory) => chatHistory.id === activeChatId
        )?.title;

        if (existingTitle) {
          chatTitle = existingTitle;
        }
      }

      const [response, generatedTitle] = await Promise.all([
        generateText(inputText, history),
        chatTitle === null && activeChatId === null
          ? generateText(
              "Give me only the topic name based on this prompt. Do not include any other text. Prompt is",
              [firstPrompt],
              getTitle
            )
          : Promise.resolve(null),
      ]);

      const updatedResponseChat = updatedChat.map((item, index) =>
        index === currentIndex ? { ...item, response } : item
      );
      setActiveChat(updatedResponseChat);

      if (activeChatId === null) {
        const newId = Date.now();
        const finalChatTitle = chatTitle || generatedTitle || "untitled";
        const newChatHistory: ChatHistoryInterface = {
          id: newId,
          title: finalChatTitle,
          chat: updatedResponseChat,
        };

        setChatHistories((prev) => [...prev, newChatHistory]);
        setActiveChatId(newId);
        window.history.replaceState(null, "", `/chat/${newId}`);
      } else {
        setChatHistories((prev) =>
          prev.map((chatHistory) =>
            chatHistory.id === activeChatId
              ? { ...chatHistory, chat: updatedResponseChat }
              : chatHistory
          )
        );
      }
    } catch (error) {
      console.error("Error generating text:", error);
      setActiveChat((prev) =>
        prev.map((item, index) =>
          index === currentIndex
            ? { ...item, response: "Failed to generate a response." }
            : item
        )
      );
    }
  };

  // New chat handler
  const handleNewChat = () => {
    navigate(`/chat`);
    setActiveChat([]);
    setActiveChatId(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  
  };

  const handleDeleteChat = (id: number) => {
    const updatedChats = chatHistories.filter((chat) => chat.id !== id);
    localStorage.setItem("chatHistories", JSON.stringify(updatedChats));
    setChatHistories(updatedChats);
    handleNewChat();
  };

  // Fetch chat histories
  useEffect(() => {
    const fetchChatHistories = () => {
      const savedChats = localStorage.getItem("chatHistories");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats) as ChatHistoryInterface[];
        const updatedChats = parsedChats.map((chat) => ({
          ...chat,
          chat: chat.chat.map((item) => ({ ...item, isNew: false })),
        }));
        setChatHistories(updatedChats);

        if (id) {
          setActiveChatId(parseInt(id));
          const chat = updatedChats.find((chat) => chat.id.toString() === id);
          setActiveChat(chat ? chat.chat : []);
        }
      }
    };

    fetchChatHistories();
  }, [id]);

  // Set focus on the textarea when the component mounts
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef, activeChatId]);

  return {
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
  };
};
