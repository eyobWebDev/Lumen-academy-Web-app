import { useEffect, useState } from "react"

function getTimeLeft(target) {
  const total = Date.parse(target) - Date.now()

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export default function Countdown({ targetTime }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTime])

  return (
    <div className="flex gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg w-fit">
      <TimeBox label="Days" value={timeLeft.days} />
      <TimeBox label="Hours" value={timeLeft.hours} />
      <TimeBox label="Min" value={timeLeft.minutes} />
      <TimeBox label="Sec" value={timeLeft.seconds} />
    </div>
  )
}

function TimeBox({ label, value }) {
  return (
    <div className="flex flex-col items-center min-w-[70px]">
      <div className="text-3xl font-bold text-gray-900">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
    </div>
  )
}
