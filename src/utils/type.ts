export interface TypewriterMarkdownInterface {
  text: string;
  speed?: number;
  isNew?: boolean;
}

export interface CodeBlockInterface {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};
