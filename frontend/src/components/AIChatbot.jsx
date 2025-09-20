import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// --- Enhanced Responsive Style Objects ---
const styles = {
  // Floating button container - responsive
  floatingContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  
  // NEW: Callout bubble for guiding users
  calloutBubble: {
    position: 'absolute',
    bottom: '70px', // Position above the button (56px height + 14px margin)
    right: '0px',
    width: '250px',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(100px)',
    borderRadius: '25px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    color: '#334155',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(10px) scale(0.95)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none', // Prevent it from capturing clicks
    zIndex: 999,
  },

  calloutBubbleVisible: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },

  calloutBubbleTip: {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    right: '20px',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid rgba(255, 255, 255, 0.98)',
  },

  calloutBubbleMobile: {
    width: 'calc(100vw - 60px)',
    maxWidth: '260px',
    bottom: '68px',
    fontSize: '0.85rem',
    right: '0px',
  },

  // Circular floating button - responsive
  floatingButton: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#6366f1",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    color: "white",
    fontSize: "22px",
    position: "relative",
    overflow: "hidden",
  },
  
  floatingButtonHover: {
    transform: "scale(1.1)",
    boxShadow: "0 12px 40px rgba(99, 102, 241, 0.4)",
    backgroundColor: "#5b5bf6",
  },
  
  // Notification badge
  notificationBadge: {
    position: "absolute",
    top: "-2px",
    right: "-2px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "11px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
  },

  // Main chatbot container - fully responsive
  aiChatbot: {
    position: "fixed",
    bottom: "88px",
    right: "20px",
    width: "360px",
    maxWidth: "calc(100vw - 40px)",
    height: "580px",
    maxHeight: "calc(100vh - 120px)",
    borderRadius: "20px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    flexDirection: "column",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    overflow: "hidden",
    transform: "translateY(20px) scale(0.95)",
    opacity: 0,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 999,
  },
  
  // Mobile-specific styles
  aiChatbotMobile: {
    bottom: "88px",
    right: "10px",
    left: "10px",
    width: "auto",
    maxWidth: "none",
    height: "70vh",
    maxHeight: "calc(100vh - 110px)",
    borderRadius: "16px",
  },
  
  aiChatbotVisible: {
    transform: "translateY(0) scale(1)",
    opacity: 1,
  },

  // Header with gradient - no close button
  chatHeader: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    padding: "18px 20px 14px",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },
  
  // Mobile header adjustments
  chatHeaderMobile: {
    padding: "16px 16px 12px",
  },
  
  headerContent: {
    position: "relative",
    zIndex: 2,
  },
  
  headerTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0 0 4px 0",
  },
  
  // Mobile title
  headerTitleMobile: {
    fontSize: "1.1rem",
  },
  
  headerSubtitle: {
    fontSize: "0.85rem",
    opacity: 0.9,
    margin: 0,
  },
  
  // Mobile subtitle
  headerSubtitleMobile: {
    fontSize: "0.8rem",
  },

  // Chat window - responsive
  chatWindow: {
    flexGrow: 1,
    padding: "20px 18px",
    overflowY: "auto",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    scrollbarWidth: "thin",
    scrollbarColor: "#e5e7eb transparent",
    minHeight: 0, // Important for flex child
  },
  
  // Mobile chat window
  chatWindowMobile: {
    padding: "16px 14px",
    gap: "12px",
  },
  
  emptyChat: {
    textAlign: "center",
    margin: "auto",
    padding: "0 16px",
  },
  
  emptyChatIcon: {
    fontSize: "2.5rem",
    marginBottom: "12px",
    opacity: 0.6,
  },
  
  // Mobile empty chat icon
  emptyChatIconMobile: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  
  emptyChatH2: {
    fontSize: "1.4rem",
    color: "#1f2937",
    margin: "0 0 6px 0",
    fontWeight: "700",
  },
  
  // Mobile empty chat title
  emptyChatH2Mobile: {
    fontSize: "1.2rem",
  },
  
  emptyChatP: {
    color: "#6b7280",
    fontSize: "0.9rem",
    margin: 0,
    lineHeight: 1.5,
  },
  
  // Mobile empty chat text
  emptyChatPMobile: {
    fontSize: "0.85rem",
  },

  // Enhanced message styling - responsive
  chatMessage: {
    display: "flex",
    maxWidth: "82%",
    animation: "messageSlideIn 0.3s ease-out",
  },
  
  // Mobile message width
  chatMessageMobile: {
    maxWidth: "88%",
  },
  
  userMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  
  assistantMessage: {
    alignSelf: "flex-start",
  },
  
  chatBubble: {
    padding: "11px 15px",
    borderRadius: "18px",
    wordWrap: "break-word",
    position: "relative",
    maxWidth: "100%",
  },
  
  // Mobile chat bubble
  chatBubbleMobile: {
    padding: "10px 14px",
    borderRadius: "16px",
  },
  
  bubbleP: {
    margin: 0,
    lineHeight: 1.6,
    fontSize: "0.9rem",
  },
  
  // Mobile bubble text
  bubblePMobile: {
    fontSize: "0.85rem",
    lineHeight: 1.5,
  },
  
  userBubble: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#ffffff",
    borderBottomRightRadius: "6px",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
  },
  
  assistantBubble: {
    backgroundColor: "#f8fafc",
    color: "#334155",
    borderBottomLeftRadius: "6px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  
  messageSender: {
    display: "block",
    fontWeight: 600,
    fontSize: "0.72rem",
    marginBottom: "5px",
    color: "#6366f1",
    letterSpacing: "0.025em",
  },
  
  // Mobile message sender
  messageSenderMobile: {
    fontSize: "0.7rem",
    marginBottom: "4px",
  },

  // Enhanced typing indicator
  typingIndicatorContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "10px 0",
  },
  
  typingIndicatorSpan: {
    width: "7px",
    height: "7px",
    backgroundColor: "#6366f1",
    borderRadius: "50%",
    animation: "bounce 1.4s infinite",
  },

  // Modern input form - responsive
  chatInputForm: {
    display: "flex",
    alignItems: "center",
    padding: "18px 20px",
    borderTop: "1px solid rgba(226, 232, 240, 0.8)",
    backgroundColor: "rgba(248, 250, 252, 0.8)",
    backdropFilter: "blur(10px)",
    gap: "10px",
  },
  
  // Mobile input form
  chatInputFormMobile: {
    padding: "14px 16px",
    gap: "8px",
  },
  
  input: {
    flexGrow: 1,
    border: "1px solid #e2e8f0",
    borderRadius: "22px",
    padding: "11px 18px",
    fontSize: "0.9rem",
    outline: "none",
    backgroundColor: "white",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  
  // Mobile input
  inputMobile: {
    padding: "10px 16px",
    fontSize: "16px", // Prevents zoom on iOS
    borderRadius: "20px",
  },
  
  inputFocus: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-1px)",
  },
  
  // Mobile input focus (no transform to prevent layout shift)
  inputFocusMobile: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
    transform: "none",
  },
  
  button: {
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#ffffff",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
    flexShrink: 0, // Prevent button from shrinking
  },
  
  // Mobile button
  buttonMobile: {
    width: "40px",
    height: "40px",
    fontSize: "1rem",
  },
  
  buttonHover: {
    transform: "scale(1.05) translateY(-1px)",
    boxShadow: "0 6px 16px rgba(99, 102, 241, 0.4)",
  },
  
  // Mobile button hover (reduced effect)
  buttonHoverMobile: {
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
  },
  
  buttonDisabled: {
    background: "#cbd5e1",
    cursor: "not-allowed",
    transform: "scale(1)",
    boxShadow: "none",
  },
  
  sendIcon: {
    fontFamily: "sans-serif",
    transform: "translateX(1px)",
  },
};

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCallout, setShowCallout] = useState(false); // NEW state for callout visibility
  const { backend, usertoken, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);
  
  // State for handling styles that require user interaction
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isFloatingButtonHovered, setIsFloatingButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // NEW: Effect to control the callout bubble visibility
  useEffect(() => {
    let timer;
    if (!isOpen) {
      // Show the callout after a short delay when the component mounts or chat is closed
      timer = setTimeout(() => {
        setShowCallout(true);
      }, 1500); // 1.5-second delay
    } else {
      // Hide immediately when chat opens
      setShowCallout(false);
    }
    
    // Cleanup timer on unmount or when isOpen changes
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && hasNewMessage) {
      setHasNewMessage(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Prepare headers with authentication token if available
      const headers = { "Content-Type": "application/json" };
      if (usertoken) {
        headers.usertoken = usertoken;
      }

      const response = await fetch(`${backend}/api/ai/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred on the server.");
      }
      const data = await response.json();

      // Append assistant message text
      const assistantText = data?.message || (typeof data === 'string' ? data : '');
      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);

      // If AI performed a booking/cancellation, refresh doctors to update slots
      const normalizedMsg = (assistantText || '').toLowerCase();
      if (normalizedMsg.includes('appointment booked') || normalizedMsg.includes('appointment cancelled')) {
        if (typeof getDoctorsData === 'function') {
          try { getDoctorsData(); } catch (_) {}
        }
      }

      // Handle navigation intents
      if (data && data.type === 'navigation') {
        if (data.intent === 'book_appointment') {
          if (data.route) {
            navigate(data.route);
          } else if (data.params?.docid) {
            navigate(`/appointments/${encodeURIComponent(data.params.docid)}`);
          } else if (data.params?.expertise) {
            navigate(`/doctors/${encodeURIComponent(data.params.expertise)}`);
          } else {
            navigate('/appointments');
          }
        } else if (data.intent === 'cancel_appointment') {
          navigate('/my-appointments');
        } else if (data.intent === 'show_doctors') {
          if (data.params?.expertise) {
            navigate(`/doctors/${encodeURIComponent(data.params.expertise)}`);
          } else {
            navigate('/doctors');
          }
        }
      }
      
      // Show notification if chat is closed
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !input.trim();

  return (
    <>
      {/* Enhanced CSS animations with mobile considerations */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { 
            transform: translateY(0); 
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
          }
          30% { 
            transform: translateY(-10px); 
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
          }
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar */
        .chat-window::-webkit-scrollbar {
          width: 4px;
        }
        .chat-window::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-window::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 2px;
        }
        .chat-window::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          .chat-window::-webkit-scrollbar {
            width: 3px;
          }
        }
      `}</style>
      
      <div style={styles.floatingContainer}>
        
        {/* NEW: Callout Message */}
        <div style={{
            ...styles.calloutBubble,
            ...(isMobile ? styles.calloutBubbleMobile : {}),
            ...(showCallout ? styles.calloutBubbleVisible : {}),
          }}>
          Chat with our medical assistant to book an appointment!
          <div style={styles.calloutBubbleTip}></div>
        </div>

        {/* Chat Window */}
        {isOpen && (
          <div 
            style={{
              ...styles.aiChatbot,
              ...(isMobile ? styles.aiChatbotMobile : {}),
              ...(isOpen ? styles.aiChatbotVisible : {}),
            }}
          >
            {/* Header - No close button */}
            <div style={{
              ...styles.chatHeader,
              ...(isMobile ? styles.chatHeaderMobile : {}),
            }}>
              <div style={styles.headerContent}>
                <h3 style={{
                  ...styles.headerTitle,
                  ...(isMobile ? styles.headerTitleMobile : {}),
                }}>
                  Medical Assistant
                </h3>
                <p style={{
                  ...styles.headerSubtitle,
                  ...(isMobile ? styles.headerSubtitleMobile : {}),
                }}>
                  How can I help you today?
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              style={{
                ...styles.chatWindow,
                ...(isMobile ? styles.chatWindowMobile : {}),
              }}
              ref={chatWindowRef}
              className="chat-window"
            >
              {messages.length === 0 && (
                <div style={styles.emptyChat}>
                  <div style={{
                    ...styles.emptyChatIcon,
                    ...(isMobile ? styles.emptyChatIconMobile : {}),
                  }}>
                    🏥
                  </div>
                  <p style={{
                    ...styles.emptyChatP,
                    ...(isMobile ? styles.emptyChatPMobile : {}),
                  }}>
                    Ask me about doctors, appointments, available slots, or any medical queries you have.
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.chatMessage,
                    ...(isMobile ? styles.chatMessageMobile : {}),
                    ...(msg.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage),
                  }}
                >
                  <div
                    style={{
                      ...styles.chatBubble,
                      ...(isMobile ? styles.chatBubbleMobile : {}),
                      ...(msg.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble),
                    }}
                  >
                    {msg.role === "assistant" && (
                      <span style={{
                        ...styles.messageSender,
                        ...(isMobile ? styles.messageSenderMobile : {}),
                      }}>
                        AI Assistant
                      </span>
                    )}
                    <p style={{
                      ...styles.bubbleP,
                      ...(isMobile ? styles.bubblePMobile : {}),
                    }}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{
                  ...styles.chatMessage,
                  ...(isMobile ? styles.chatMessageMobile : {}),
                  ...styles.assistantMessage,
                }}>
                  <div style={{
                    ...styles.chatBubble,
                    ...(isMobile ? styles.chatBubbleMobile : {}),
                    ...styles.assistantBubble,
                  }}>
                    <span style={{
                      ...styles.messageSender,
                      ...(isMobile ? styles.messageSenderMobile : {}),
                    }}>
                      AI Assistant
                    </span>
                    <div style={styles.typingIndicatorContainer}>
                      <span style={styles.typingIndicatorSpan}></span>
                      <span style={{ ...styles.typingIndicatorSpan, animationDelay: "0.2s" }}></span>
                      <span style={{ ...styles.typingIndicatorSpan, animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={sendMessage} 
              style={{
                ...styles.chatInputForm,
                ...(isMobile ? styles.chatInputFormMobile : {}),
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
                style={{
                  ...styles.input,
                  ...(isMobile ? styles.inputMobile : {}),
                  ...(isInputFocused 
                    ? (isMobile ? styles.inputFocusMobile : styles.inputFocus) 
                    : {}
                  ),
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              <button
                type="submit"
                disabled={isSubmitDisabled}
                style={{
                  ...styles.button,
                  ...(isMobile ? styles.buttonMobile : {}),
                  ...(isSubmitDisabled ? styles.buttonDisabled : {}),
                  ...(isButtonHovered && !isSubmitDisabled 
                    ? (isMobile ? styles.buttonHoverMobile : styles.buttonHover) 
                    : {}
                  ),
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                <span style={styles.sendIcon}>➤</span>
              </button>
            </form>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={toggleChat}
          style={{
            ...styles.floatingButton,
            ...(isFloatingButtonHovered ? styles.floatingButtonHover : {}),
          }}
          onMouseEnter={() => setIsFloatingButtonHovered(true)}
          onMouseLeave={() => setIsFloatingButtonHovered(false)}
          title="Open Medical Assistant"
        >
          {isOpen ? "✕" : "💬"}
          {hasNewMessage && !isOpen && (
            <div style={styles.notificationBadge}>!</div>
          )}
        </button>
      </div>
    </>
  );
};

export default AIChatbot;