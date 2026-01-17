
const getExamState = (exam) => {
  const now = Date.now();

  const start = new Date(exam.startTime).getTime();
  const end = start + exam.durationMinutes * 60000;
  const graceEnd = end + exam.reviewTime * 60000;

  if (now < start) return "scheduled";
  if (now >= start && now <= end) return "live";
  if (now > end && now <= graceEnd) return "review";
  return "closed";
};

export default getExamState
