import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import Container from "./Container";
import { AnimatePresence, motion } from "motion/react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import TypingDots from "./TypingDots";
import RobotCanvas from "./canvas/Robot";
interface IMessage {
  role: "assistant" | "user";
  content: string;
}
const API_URL = import.meta.env.DEV
  ? "http://localhost:3001/api/chat"
  : "/api/chat";

const AI = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      role: "assistant",
      content:
        "Hello, This is AI Mohammed, Ask me anything about my projects or work expirence. ",
    },
  ]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [robotAnimation, setRobotAnimation] = useState<string>("iddle");
  const [hasPlayedHello, setHasPlayedHello] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleTyping() {
    if (robotAnimation !== "attackminiguns") {
      setRobotAnimation("attackminiguns");
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setRobotAnimation("iddle");
    }, 1500);
  }

  function onEnterPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (isSending && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onTextSend();
    }
  }

  async function onTextSend() {
    if (!textareaRef.current) return;
    setRobotAnimation("attackspin");

    const text = textareaRef.current.value.trim();
    if (!text) return;

    textareaRef.current.value = "";
    setIsSending(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "..." },
    ]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.reply,
        };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong with OpenAI",
        };
        return updated;
      });
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setRobotAnimation("iddle");
      }, 2000);
    }
  }

  const handleViewportEnter = () => {
    if (!hasPlayedHello) {
      setRobotAnimation("hello");
      setHasPlayedHello(true);

      setTimeout(() => {
        setRobotAnimation("iddle");
        setHasPlayedHello(false);
      }, 2000);
    }
  };

  return (
    <motion.section
      id="AI"
      className="relative scroll-mt-50"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onViewportEnter={handleViewportEnter}
      viewport={{ margin: "0px 0px -200px 0px" }}
    >
      <Container>
        <h2 className="mb-8 text-center md:text-start bg-linear-to-r from-blue-600 via-cyan-400 to-teal-700 to-70% bg-clip-text text-4xl font-extrabold text-transparent">
          Ask My AI Assisant
        </h2>
        <div>
          <Card className="group grid md:grid-cols-2 lg:gap-8 hover:bg-linear-to-bl  hover:from-blue-500/40 hover:to-transparent hover:to-40% shadow-[0_10px_15px_rgba(37,99,235,0.5),-1px_-1px_5px_rgba(37,99,235,0.5)] hover:shadow-blue-600 hover:shadow-[0_20px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(37,99,235,0.7)] transition-all duration-500">
            <div className="flex flex-col justify-between overflow-hidden space-y-4 h-120 rounded-2xl border border-border">
              <div className="p-2 text-center text-white font-medium bg-blue-600 rounded-t-2xl">
                AI Assistance
              </div>
              <div
                ref={chatContainerRef}
                className="p-4 space-y-10 grow chat-scroll overflow-y-scroll overflow-x-hidden flex flex-col"
              >
                <AnimatePresence>
                  {messages.map((message, idx) => {
                    const isAI = message.role === "assistant";

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`flex space-x-2 ${isAI ? "" : "self-end"}`}
                      >
                        {isAI && (
                          <div className="size-10 rounded-full overflow-hidden border border-blue-400">
                            <img
                              className="object-cover w-full h-full"
                              src="robot.png"
                              alt="Bot"
                            />
                          </div>
                        )}

                        <div
                          className={`p-2 max-w-xs rounded-2xl flex items-center text-white
            ${
              isAI
                ? "bg-gray-700 rounded-es-none"
                : "bg-neutral-800 rounded-ee-none"
            }
          `}
                        >
                          {message.content === "..." ? (
                            <TypingDots />
                          ) : (
                            message.content
                          )}
                        </div>

                        {!isAI && (
                          <div className="size-10 rounded-full overflow-hidden border border-blue-400">
                            <img
                              className="object-cover w-full h-full"
                              src="user.png"
                              alt="User"
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              <div className="flex m-1 items-center justify-center space-x-2 text-center rounded-b-2xl">
                <textarea
                  onKeyDown={onEnterPress}
                  onChange={handleTyping}
                  name="userchat"
                  ref={textareaRef}
                  className="overflow-hidden w-[85%] py-1 resize-none h-10 sm:h-12 border border-blue-400 rounded-full sm:py-2.5 px-3 focus:outline-none
             focus:ring-2
             focus:ring-blue-500
             focus:border-blue-500
             focus:shadow-md
             focus:shadow-blue-500
             transition text-blue-300"
                  placeholder="Write your message here..."
                />

                <button
                  onClick={onTextSend}
                  disabled={isSending}
                  type="button"
                  aria-label="Send message"
                  className="size-10 md:size-12 rounded-full bg-blue-600 text-text-primary
             flex items-center justify-center
           hover:bg-blue-600/80
           hover:shadow-blue-600
           hover:shadow-2xl
             hover:-translate-y-1
           active:shadow-blue-500
             active:translate-y-0
             cursor-pointer
             focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="size-4 md:size-6"
                  />
                </button>
              </div>
            </div>
            <div className="hidden md:flex">
              <RobotCanvas currentAnimation={robotAnimation} />
            </div>
          </Card>
        </div>
      </Container>
    </motion.section>
  );
};

export default AI;
