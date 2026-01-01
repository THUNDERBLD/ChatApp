import { useEffect, useState } from 'react'
import Header from './Header'
import ChatList from './ChatList'
import ChatSection from './ChatSection';
import useChatStore, { Chat } from '@/components/store/chatStore';

const ChatPage = () => {
  // Fix: Explicitly define the state type to accept Chat objects
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024)

  const setCurrentChat = useChatStore((state) => state.setCurrentChat)
  const currentChat = useChatStore((state) => state.currentChat)

  useEffect(() => {
    const handleSize = () => {
      setIsMobileView(window.innerWidth < 1024);
    }

    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])
  
  // Fix: Typed the parameter
  const handleChatSelect = (chat: Chat | null) => {
    setSelectedChat(chat)
    setCurrentChat(chat);
  }

  const handleBackToChatList = () => {
    setSelectedChat(null)
    setCurrentChat(null)
  }

  // Sync selectedChat with currentChat from store
  // This allows notifications to change the active chat
  useEffect(() => {
    if (currentChat && currentChat._id !== selectedChat?._id) {
      setSelectedChat(currentChat);
    }
  }, [currentChat]);
  
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div
          className={`w-full lg:w-90 border-r ${
            isMobileView && selectedChat ? "hidden" : "block"
          }`}
        >
          <ChatList
            onChatSelect={handleChatSelect}
            selectedChat={selectedChat}
          />
        </div>
        <div
          className={`flex-1 ${
            isMobileView && !selectedChat ? "hidden" : "flex"
          }`}
        >
          {selectedChat ? (
            <ChatSection
              chat={selectedChat}
              // Fix: Changed null to undefined to match optional prop type
              onBack={isMobileView ? handleBackToChatList : undefined}
            />
          ) : (
            <div className="flex-1 hidden lg:flex items-center justify-center bg-muted/30">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">
                  Select a chat to start messaging
                </p>
                <p className="text-sm">Or start a new conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;