import React, { useEffect, useState } from "react";

const ChatBot = ({ children }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const script1 = document.createElement('script');
  script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
  script1.async = true;

  const script2 = document.createElement('script');
  script2.src = 'https://mediafiles.botpress.cloud/f0c3b3d2-b200-4e2d-84f4-2bb5ff0bb120/webchat/config.js';
  script2.async = true;

  useEffect(() => {
    const loadScripts = () => {
      // Load scripts here
      document.body.appendChild(script1);
      document.body.appendChild(script2);
      setScriptsLoaded(true); // Mark scripts as loaded
    };

    if (!scriptsLoaded) {
      loadScripts();
    }

    // Cleanup scripts when the component is unmounted
    return () => {
      // Cleanup scripts only if they were loaded
      if (scriptsLoaded) {
        script1.replaceWith(document.createElement('div'));
        script2.replaceWith(document.createElement('div'));
      }
    };
  }, [script1, script2, scriptsLoaded]);

  return <>{children}</>;
};

export default ChatBot;