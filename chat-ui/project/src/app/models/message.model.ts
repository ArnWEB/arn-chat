export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  type: 'user' | 'system';
  avatar: string;
  messageType: 'CHAT' | 'JOIN' | "LEAVE"
}