import format from "date-fns/format";
import sortBy from "lodash/sortBy";

export default function ResultTable({ rows }) {
  return (
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-3">Object name</th>
          <th class="px-6 py-3">Size estimate (meters)</th>
          <th class="px-6 py-3">Time</th>
          <th class="px-6 py-3">Distance (km)</th>
        </tr>
      </thead>
      <tbody>
        {sortBy(rows, "distance").map((row, index) => (
          <tr key={index}>
            <td class="px-6 py-4">{row.name}</td>
            <td class="px-6 py-4">
              {Math.round(row.minDiametertMeters)}-
              {Math.round(row.maxDiametertMeters)}
            </td>
            <td class="px-6 py-4">
              {format(new Date(row.time), "yyyy-MM-dd HH:mm")}
            </td>
            <td class="px-6 py-4">
              {Math.round(row.distance).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
