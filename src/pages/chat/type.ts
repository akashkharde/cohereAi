export interface ChatInterface {
  prompt: string;
  response: string | null;
  isNew?: boolean;
}

export interface ChatHistoryInterface {
  id: number;
  title: string;
  chat: ChatInterface[];
}
