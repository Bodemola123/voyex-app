import { useState, useEffect } from "react";

function ChatReply() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.
  \n  1. Androids and Humans: The novel explores the uneasy coexistence of humans and androids. Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.
  \n  2. Empathy and Identity: To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses. Androids lack empathy, making them vulnerable to detection.
  \n  3. Status Symbols: Owning real animals is a status symbol due to mass extinctions. Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col text-xs">
      {/* Message Bubble */}
      <div className="text-xs font-medium max-w-[549px] bg-[#1C1D1F] p-2 rounded-lg relative">
        <p>{displayedText}</p>
      </div>
    </div>
  );
}

export default ChatReply;
