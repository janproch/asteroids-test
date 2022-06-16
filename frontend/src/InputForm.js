import React from "react";
import DatePicker from "react-datepicker";
import differenceInDays from "date-fns/differenceInDays";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

export default function InputForm({ onSubmit }) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const diff = differenceInDays(endDate, startDate);
    if (diff > 7) setError("Interval must be max 7 days long");
    else if (diff < 0) setError("End date must be after start date");
    else setError(null);
  }, [startDate, endDate]);

  return (
    <div class="w-full ">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="block text-2xl mb-4">Near-Earth space object explorer</div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Start date
          </label>

          <DatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            End date
          </label>

          <DatePicker
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            selected={endDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setEndDate(date)}
          />

          {error && <p class="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div class="flex items-center justify-between">
          <button
            class={clsx(
              "text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              error ? "bg-slate-300" : "bg-blue-500 hover:bg-blue-700"
            )}
            type="button"
            disabled={!!error}
            onClick={() => onSubmit({ start: startDate, end: endDate })}
          >
            Find objects
          </button>
        </div>
      </form>
    </div>
  );
}
