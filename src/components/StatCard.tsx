interface StatCardProps {
  label: string;
  value: string;
  change?: string; 
  positive?: boolean;
}

export function StatCard({ label, value, change, positive }: StatCardProps) {
  return (
    <div style={{
      background: "#f9f9f9",
      borderRadius: 10,
      padding: "12px 16px",
      minWidth: 140,
    }}>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 600, margin: "0 0 2px" }}>{value}</p>
      {change && (
        <p style={{ fontSize: 12, color: positive ? "green" : "red", margin: 0 }}>
          {change}
        </p>
      )}
    </div>
  );
}