export type ProgressSummary = {
  completedDays: number;
  currentDay: number;
  percent: number;
  streak: number;
  totalDays: number;
};

export function summarizeProgress(days: number[], totalDays = 21): ProgressSummary {
  const completed = [...new Set(days)]
    .filter((day) => Number.isInteger(day) && day >= 1 && day <= totalDays)
    .sort((a, b) => a - b);

  let streak = 0;
  while (completed.includes(streak + 1)) streak += 1;

  return {
    completedDays: completed.length,
    currentDay: Math.min(streak + 1, totalDays),
    percent: Math.round((completed.length / totalDays) * 100),
    streak,
    totalDays,
  };
}
