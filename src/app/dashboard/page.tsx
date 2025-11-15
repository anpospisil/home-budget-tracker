import { prisma } from "@/lib/prisma";
import SummaryCard from "@/app/components/SummaryCard";
import MonthlyBarChart from "@/app/components/BarChart";
import CategoryPieChart from "@/app/components/PieChart";

export default async function HomePage() {
  const transactions = await prisma.transaction.findMany();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

 const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const barData = months.map((month) => {
    const monthlyTransactions = transactions.filter(
      (t) => t.date.getMonth() + 1 === month
    );
    const income = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      month: `M${month}`,
      income,
      expenses,
    };
  });

const categoryTotals: { [key: string]: number } = {};

transactions
  .filter(t => t.type === 'expense')
  .forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });

const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
  name,
  value: parseFloat(value.toFixed(2)),
}));


  return (
  <main className="max-w-6xl mx-auto p-6 space-y-8">
    {/* Summary Cards */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Total Income" value={income} />
      <SummaryCard title="Total Expenses" value={expenses} />
      <SummaryCard title="Balance" value={balance} />
    </section>

    {/* Charts */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MonthlyBarChart data={barData} />
      <CategoryPieChart data={pieData} />
    </section>
  </main>
)}
