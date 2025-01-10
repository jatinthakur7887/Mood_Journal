import React, { useState } from "react";

const EntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", content: "", mood: "Happy" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", content: "", mood: "Happy" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <select
        name="mood"
        value={formData.mood}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Happy">Happy</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Add Entry
      </button>
    </form>
  );
};

export default EntryForm;
