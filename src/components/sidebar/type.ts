import { ChatHistoryInterface } from "../../pages/chat/type";

export interface SidebarInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  chatHistory: ChatHistoryInterface[];
  onNewChat: () => void;
  handleDeleteChat: (id: number) => void;
  activeChatId: number | null
}
