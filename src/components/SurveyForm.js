import React, { useState } from "react";

const SurveyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    mood: "",
    ateWell: false,
    homeworkHours: 0,
    gpa: 0.0,
    extracurricular: false,
    extracurricularHours: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      mood: "",
      ateWell: false,
      homeworkHours: 0,
      gpa: 0.0,
      extracurricular: false,
      extracurricularHours: 0,
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mood:
          </label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="">Select your mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Tired">Tired</option>
            <option value="Angry">Angry</option>
            <option value="Depressed">Depressed</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>

        <div className="form-group flex items-center">
          <input
            type="checkbox"
            name="ateWell"
            checked={formData.ateWell}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm font-bold">
            Ate Well Today
          </label>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hours of Homework:
          </label>
          <input
            type="number"
            name="homeworkHours"
            value={formData.homeworkHours}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Current GPA:
          </label>
          <input
            type="number"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            step="0.01"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="form-group flex items-center">
          <input
            type="checkbox"
            name="extracurricular"
            checked={formData.extracurricular}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm font-bold">
            Involved in Extracurricular
          </label>
        </div>

        {formData.extracurricular && (
          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hours in Extracurricular per Day:
            </label>
            <input
              type="number"
              name="extracurricularHours"
              value={formData.extracurricularHours}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded font-bold hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
