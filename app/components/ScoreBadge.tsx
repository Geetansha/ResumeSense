import React from "react";

type ScoreBadgeProps = {
  score: number;
};

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeText = "";
  let badgeColor = "";

  if (score >= 90) {
    badgeText = "Outstanding";
    badgeColor = "bg-emerald-100 text-emerald-700";
  } else if (score >= 75) {
    badgeText = "Strong Match";
    badgeColor = "bg-green-100 text-green-700";
  } else if (score >= 60) {
    badgeText = "Competitive";
    badgeColor = "bg-yellow-100 text-yellow-700";
  } else if (score >= 40) {
    badgeText = "Needs Improvement";
    badgeColor = "bg-orange-100 text-orange-700";
  } else {
    badgeText = "Poor Fit";
    badgeColor = "bg-red-100 text-red-700";
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}
    >
      {badgeText}
    </div>
  );
};

export default ScoreBadge;