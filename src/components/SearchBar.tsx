interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Buscar moneda..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 280,
          padding: "8px 14px",
          fontSize: 14,
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}