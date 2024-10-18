// Chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  return (
    <div>
      {/* Chatbot button */}
      <button 
        onClick={() => setIsChatbotVisible(!isChatbotVisible)} 
        className="chatbot-button"
      >
        {isChatbotVisible ? 'X' : 'Chat with Us'}
      </button>

      {/* Chatbot iframe */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <iframe 
            src="https://app.ailifebot.com/static/standalone/standalone.html?bot_key=9c5495e32254473f&env=p" 
            title="Ailifebot Chatbot"
            className="chatbot-iframe"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
