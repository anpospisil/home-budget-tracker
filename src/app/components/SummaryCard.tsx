type CardProps = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold mt-2">
        €{value.toFixed(2)}
      </p>
    </div>
  );
}
