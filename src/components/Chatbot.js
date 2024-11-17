// Chatbot.js
import React, { useState } from 'react';
import '../App.css';

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
            src="https://app.ailifebot.com/static/standalone/standalone.html?bot_key=a8546d851e5145ca&env=p" 
            title="Ailifebot Chatbot"
            className="chatbot-iframe"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
