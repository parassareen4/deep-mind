import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import { MessageSquare, ArrowUpIcon, User2Icon, ArrowLeft } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import responder from "../src/assets/image.png";
import copy from '../src/assets/copy.svg'
import like from '../src/assets/like.svg'
import dislike from '../src/assets/dislike.svg'
import share from '../src/assets/share.svg'
import logo from '../public/image.png'
import LandingPage from "./Landing";

const socket = io("https://chatgpttroll-3l88.onrender.com/");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});

const Chat = () => {
  const { roomId } = useParams();
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.emit("getMessages", roomId);
    socket.emit("userJoined", { roomId });
    const handleChatHistory = (messages) => {
      setChat(messages);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleQuestion = ({ roomId: receivedRoomId, msg }) => {
      if (receivedRoomId === roomId) {
        setChat((prevChat) => {
          const newChat = [...prevChat, { role: "asker", message: msg }];
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          return newChat;
        });
      }
    };

    const handleResponse = ({ roomId: receivedRoomId, msg }) => {
      if (receivedRoomId === roomId) {
        setChat((prevChat) => {
          const newChat = [...prevChat, { role: "responder", message: msg }];
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
          return newChat;
        });
      }
    };

    const handleRoomDeleted = ({ roomId }) => {
      console.log(`Room ${roomId} has been deleted`);
      toast.success(`Room ${roomId} has been deleted`);
      navigate("/");
    };

    const handleTyping = () => {
      console.log("Typing...");
      socket.emit("typing", { roomId });
      setIsTyping(false);
    };

    const handleStopTyping = () => {
      socket.emit("stopTyping", { roomId });
      setIsTyping(false);
    };

    socket.on("chatHistory", handleChatHistory);
    socket.on("question", handleQuestion);
    socket.on("response", handleResponse);
    socket.on("roomDeleted", handleRoomDeleted);
    
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    

    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("question", handleQuestion);
      socket.off("response", handleResponse);
      socket.off("roomDeleted", handleRoomDeleted);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const role = window.location.pathname.includes("/chat/")
        ? "responder"
        : "asker";
      socket.emit(role === "responder" ? "response" : "question", {
        roomId,
        msg: message,
      });
      setMessage("");
      socket.emit("stopTyping", { roomId });
    }
  };


  // Emitting 'stopTyping' when user stops typing


// Example: You could use a timeout to detect when the user stops typing
let typingTimeout;
const handleInputChange = (e) => {
  setMessage(e.target.value);
  socket.emit("typing", { roomId });
  autoResize(e.target);

  // Clear the previous timeout and set a new one
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(handleStopTyping, 1000); // Adjust the time for when to stop typing
};
  

  const shareChat = () => {
    const shareData = {
        title: 'Chat',
        text: 'Check out this chat!',
        url: window.location.href,
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareData.url).then(() => {
            toast.success("Link copied to clipboard!");
        }).catch((err) => {
            toast.error("Could not copy text...");
        });
    }
  };

  const createNewChat = () => {
    socket.emit("createRoom", (newRoomId) => {
      navigate(`/chat/${newRoomId}`);
    });
  };

  const autoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <header className="flex justify-between items-center p-2 sm:p-4 border-b border-gray-200">
        <div className="flex items-center gap-1 sm:gap-2">
    

          <div className="flex gap-1 items-center">
         
            <header style={{
              fontSize: '1.5em',
              fontWeight: 'bold',
              color: '#000000',
              marginLeft: '1em',
              fontFamily: 'Montserrat',
            }}> Hustlers University</header>
          </div>
        </div>
        <h1 className="text-lg  sm:text-xl font-semibold hidden sm:flex gap-2 items-center">New Chat</h1>
        <div className="flex items-center gap-2 sm:gap-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="share-button p-1 sm:p-2 bg-white text-black rounded-3xl px-2 sm:px-4 border border-gray-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            onClick={shareChat}
          >
            <img src={share} alt="share" className="h-3 sm:h-5" /> <span className="hidden sm:inline">Share</span>
          </motion.button>
          <div className="p-1 sm:p-2 rounded-full bg-slate-200 group cursor-pointer"><User2Icon className="w-4 h-4 sm:w-6 sm:h-6" /></div>
        </div>
      </header>
      <main className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto flex-1 overflow-auto p-2 sm:p-4 space-y-4 sm:space-y-6 mt-6 hide-scrollbar scroll-smooth">
        <AnimatePresence>
          {chat.map((msg, idx) => {
            const isLastResponderMessage =
              msg.role === "responder" &&
              (idx === chat.length - 1);
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start relative ${
                  msg.role === "responder" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.role === 'responder' && (
                  
                    <img src={responder} alt="Responder Logo" className="  rounded-full h-10 w-10  " />
                  
                )}
                <div
                  className={`${
                    msg.role === "responder" ? "responder-bubble" : "asker-bubble"
                  } max-w-[85%] sm:max-w-[70%] rounded-2xl sm:rounded-3xl px-3 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base ${
                    msg.role === "responder" ? "text-left" : "text-right"
                  } ${msg.role === 'asker' ? 'bg-[#f4f4f4]' : 'bg-white'}`}
                >
                  {msg.message}
                </div>
                {isLastResponderMessage && (
                  <div className="flex space-x-1 mt-1 sm:mt-2 absolute left-8 sm:left-12 top-full">
                    <div className="p-1 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                      <img src={copy} alt="Copy" className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div className="p-1 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                      <img src={like} alt="Like" className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div className="p-1 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                      <img src={dislike} alt="Dislike" className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}

          <div ref={chatEndRef}></div>
        </AnimatePresence>
        <div ref={chatEndRef} />
        <div className="h-10"></div>
      </main>
      
      <form onSubmit={sendMessage} className="p-2 sm:p-4">
        <div className="flex items-center w-full sm:w-10/12 md:w-9/12 lg:w-7/12 mx-auto space-x-2 py-1 rounded-[33px] bg-[#f4f4f4] relative pr-2">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            placeholder="Message Hustlers University"
            className="flex-1 py-2 sm:py-3 px-3 sm:px-5 rounded-[33px] bg-[#f4f4f4] focus-within:outline-none placeholder:text-slate-600 text-sm sm:text-base resize-none overflow-hidden"
            rows="1"
          />
          <button
            type="submit"
            className="p-1.5 sm:p-2 rounded-full bg-black text-white hover:bg-opacity-75"
          >
            <ArrowUpIcon size={18} className="sm:w-5 sm:h-5" fontWeight={900} />
          </button>
        </div>
      </form>
      <div className="text-center p-2 text-xs sm:text-sm hidden sm:block text-gray-500">
      From Zero to Hero with Hustler's University
      </div>
    </div>
      );
    };
    

    const Responder = () => {
      const [activeRooms, setActiveRooms] = useState({});
      const navigate = useNavigate();
    
      const playSuccessSound = () => {
        console.log('Attempting to play sound...');
        const audio = new Audio('/soundrn.mp3');
        
        audio.play().then(() => {
            console.log('Sound played successfully');
        }).catch((error) => {
            console.error('Error playing sound:', error);
        });
    };
      
    
      useEffect(() => {
        socket.emit("getRooms");
      
        // Notify the responder when a new user joins any room
        socket.on("userJoined", ({ roomId }) => {
          playSuccessSound();
          console.log(`User joined room: ${roomId}`);
          toast.success(`A new user joined room: ${roomId}`, {
            onOpen: () => {
              console.log("Toast opened, playing sound...");
              playSuccessSound();
            },  // Play sound when the toast opens
          });
    
        });
      
        socket.on("roomsList", (roomsList) => {
          console.log("Received rooms list:", roomsList);
          const formattedRooms = roomsList.reduce((acc, room) => {
            acc[room.id] = room.latestMessage;
            return acc;
          }, {});
          setActiveRooms(formattedRooms);
        });
      
        const handleQuestion = ({ roomId, msg }) => {
          console.log("Received question:", msg);
          setActiveRooms((prevActive) => ({
            ...prevActive,
            [roomId]: msg,
          }));
        };
      
        const handleRoomDeleted = ({ roomId }) => {
          console.log(`Room ${roomId} has been deleted`);
          setActiveRooms((prevRooms) => {
            const newRooms = { ...prevRooms };
            delete newRooms[roomId];
            return newRooms;
          });
          toast.success(`Room ${roomId} has been deleted`);
        };
      
        socket.on("question", handleQuestion);
        socket.on("roomDeleted", handleRoomDeleted);
        socket.on("getRooms", () => {
          socket.emit("getRooms");
        });
      
        return () => {
          socket.off("userJoined");
          socket.off("roomsList");
          socket.off("roomDeleted", handleRoomDeleted);
          socket.off("question", handleQuestion);
          socket.off("getRooms");
        };
      }, []);
      
      const handleRoomClick = (roomId) => {
        navigate(`/chat/${roomId}`);
      };
    
      const sendResponse = (roomId) => {
        navigate(`/chat/${roomId}`);
      };
    
      const deleteRoom = (roomId) => {
        console.log(`Deleting room from client: ${roomId}`);
        socket.emit("deleteRoom", roomId);
      };
    
      return (
        <div className="flex flex-col h-screen bg-white text-gray-800">
          <header className="flex justify-between items-center p-2 sm:p-4 border-b border-gray-200">
            <h1 className="text-lg sm:text-xl font-semibold">Responder Dashboard</h1>
          </header>
          <main className="flex-1 overflow-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
            <div>
              {Object.keys(activeRooms).length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No active users at the moment.
                </p>
              ) : (
                Object.keys(activeRooms).map((roomId) => (
                  <div
                    key={roomId}
                    className="p-2 sm:p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRoomClick(roomId)}
                  >
                    <div className="flex items-center justify-between w-full sm:w-11/12 mx-auto">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <MessageSquare size={20} className="text-[#6c71ff] sm:w-6 sm:h-6" />
                        <div>
                          <h2 className="font-semibold text-sm sm:text-base">{roomId}</h2>
                          <p className="text-xs sm:text-sm text-gray-500 text-wrap">
                            {activeRooms[roomId] || "New User here"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold bg-green-500 text-white hover:bg-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            sendResponse(roomId);
                          }}
                        >
                          Respond
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm bg-red-500 border-red-800 text-white font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteRoom(roomId);
                          }}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      );
    };

const App = () => {
  const roomId = getRoomIdForUser();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
          path="/"
          element={<LandingPage/>}/>
          <Route
            path="/user"
            element={<Navigate to={`/user/${roomId}`} replace />}
          />
          <Route
            path="/user/:roomId"
            element={<Chat />}
          />
          <Route
            path="/responder"
            element={<Responder />}
          />
          <Route
            path="/chat/:roomId"
            element={<Chat />}
          />
          <Route
            path="*"
            element={<Navigate to={`/user/${roomId}`} replace />}
          />
        </Routes>
      </div>
      <Toaster/>
    </Router>
  );
};

const getRoomIdForUser = () => {
  return `room-${Math.random().toString(36).substr(2, 9)}`;
};

export default App;
