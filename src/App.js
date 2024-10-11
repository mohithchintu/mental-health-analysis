import React, { useState } from "react";
import SurveyForm from "./components/SurveyForm";
import MoodChart from "./components/MoodChart";

function App() {
  const [surveyData, setSurveyData] = useState([]);

  const calculateBurnoutScore = (entry, previousEntry) => {
    let moodScore = 0;
    switch (entry.mood) {
      case "Happy":
        moodScore = 1;
        break;
      case "Neutral":
        moodScore = 2;
        break;
      case "Tired":
      case "Sad":
        moodScore = 3;
        break;
      case "Angry":
      case "Depressed":
        moodScore = 4;
        break;
      default:
        moodScore = 2;
    }

    const homeworkScore = entry.homeworkHours * 0.5;
    const extracurricularScore = entry.extracurricularHours * 0.3;
    const gpaScore = entry.gpa >= 3.5 ? 2 : 1;

    let burnoutScore =
      moodScore + homeworkScore + extracurricularScore + gpaScore;

    if (previousEntry && previousEntry.burnoutScore >= 10) {
      burnoutScore = Math.max(burnoutScore, previousEntry.burnoutScore - 0.5);
    }

    return burnoutScore;
  };

  const handleFormSubmit = (formData) => {
    const previousEntry = surveyData[surveyData.length - 1];
    const burnoutScore = calculateBurnoutScore(formData, previousEntry);
    setSurveyData([...surveyData, { ...formData, burnoutScore }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl text-white font-bold mb-8">
        Student Wellness Tracker
      </h1>
      <SurveyForm onSubmit={handleFormSubmit} />
      <MoodChart data={surveyData} />
    </div>
  );
}

export default App;
