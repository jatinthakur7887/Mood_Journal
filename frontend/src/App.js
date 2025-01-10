import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import JournalEntries from "./components/JournalEntries";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className="container mx-auto p-4">
      {!isLoggedIn ? (
        <>
          <Register />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </>
      ) : (
        <JournalEntries />
      )}
    </div>
  );
};

export default App;
