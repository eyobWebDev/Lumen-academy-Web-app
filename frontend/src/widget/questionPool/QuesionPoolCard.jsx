function QuesionPoolCard({ questionPool : subject }) {
  console.log(subject);
  
  return (
    <div className="border-l-2  bg-base-300 rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold">
        {subject.name}
      </h2>

      {subject.description && (
        <p className="text-sm text-gray-600 mt-1">
          {subject.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>
          Total Questions:{" "}
          <strong className="text-gray-800">
            {subject.totalQuestions}
          </strong>
        </span>

        <span>
          {new Date(subject.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default QuesionPoolCard
