import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

interface Transfer {
  to: string;
  amount: number;
  expenses: string;
  createdAt: string;
}

const RecentTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axiosInstance.get("/transfer/recent");
        setTransfers(response.data.data);
      } catch (error) {
        console.error("Error fetching recent transfers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Recent Transfers</h2>

      {loading ? (
        <p className="text-muted-foreground">Loading transfers...</p>
      ) : transfers.length === 0 ? (
        <p className="text-muted-foreground">No recent transfers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transfers.map((transfer, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-background"
            >
              <p><strong>To:</strong> {transfer.to}</p>
              <p><strong>Amount:</strong> ${transfer.amount.toFixed(2)}</p>
              <p><strong>Expense:</strong> {transfer.expenses}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(transfer.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransfers;
