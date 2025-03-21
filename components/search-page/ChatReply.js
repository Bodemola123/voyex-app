
function ChatReply() {

  return (
    <div className="flex flex-col text-sm">

        {/* Message Bubble */}
        <div className="text-sm font-medium max-w-[549px] bg-[#1C1D1F] p-4 rounded-lg relative">
          <p>
            <strong>Do Androids Dream of Electric Sheep?</strong> is a 1968 dystopian science fiction novel by American writer <strong>Philip K. Dick</strong>. 
            Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.
          </p>
          <ol className="list-decimal pl-5 mt-3 space-y-2">
            <li>
              <strong>Androids and Humans:</strong> The novel explores the uneasy coexistence of humans and androids. 
              Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.
            </li>
            <li>
              <strong>Empathy and Identity:</strong> To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses. 
              Androids lack empathy, making them vulnerable to detection.
            </li>
            <li>
              <strong>Status Symbols:</strong> Owning real animals is a status symbol due to mass extinctions. 
              Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.
            </li>
          </ol>
        </div>
        </div>
        
  );
}

export default ChatReply;
