import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TelemetryRecord {
  prompt_hash: string;
  score: number;
  role: string;
  metrics: {
    var_included?: boolean;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<TelemetryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/telemetry/prompts?score_lt=2.0")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Telemetry fetch failed:", err);
        setLoading(false);
      });
  }, []);

  return (
      <div className="p-8 min-h-screen bg-gray-50">
        <h1>⚠️ Flagged Prompts (Score &lt; 2.0)</h1>


        {loading ? (
            <p className="text-gray-500">Loading telemetry...</p>
        ) : data.length === 0 ? (
            <p className="text-green-600">No underperforming prompts found. 🎉</p>
        ) : (
            <table className="min-w-full table-auto border border-gray-300 bg-white shadow-sm">
              <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Prompt Hash</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Score</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium">VaR Mentioned</th>
                <th className="px-4 py-2"></th>
              </tr>
              </thead>
              <tbody>
              {data.map((item) => (
                  <tr key={item.prompt_hash} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-sm text-gray-800">{item.prompt_hash}</td>
                    <td className="px-4 py-2">{item.score.toFixed(2)}</td>
                    <td className="px-4 py-2">{item.role}</td>
                    <td className="px-4 py-2">{item.metrics?.var_included ? "✅" : "❌"}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                          onClick={() => navigate(`/prompt/${item.prompt_hash}`)}
                          className="text-sm text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
}
