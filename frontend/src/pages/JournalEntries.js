import React, { useEffect, useState } from "react";
import API from "../api";
import EntryForm from "./EntryForm";
import Quote from "./Quote";

const JournalEntries = () => {
  const [entries, setEntries] = useState([]);
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState("");

  const fetchEntries = async () => {
    try {
      const { data } = await API.get("/journal");
      setEntries(data);
    } catch (error) {
      alert("Failed to load entries.");
    }
  };

  const fetchQuote = async () => {
    try {
      const { data } = await API.get("/quotes");
      setQuote(data.quote);
    } catch (error) {
      alert("Failed to fetch quote.");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleNewEntry = async (newEntry) => {
    try {
      await API.post("/journal", newEntry);
      setShowQuote(true);
      fetchQuote();
      fetchEntries();
    } catch (error) {
      alert("Failed to add entry.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Journal Entries</h2>
      <EntryForm onSubmit={handleNewEntry} />
      {showQuote && <Quote text={quote} />}
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="border p-4 rounded">
            <h3 className="font-bold">{entry.title}</h3>
            <p>{entry.content}</p>
            <span className="text-sm text-gray-500">Mood: {entry.mood}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalEntries;
