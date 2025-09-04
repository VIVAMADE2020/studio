
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '@/app/actions/clients';
import { formatCurrency } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ClientDashboardChartProps {
  data: Transaction[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
        <p className="text-sm text-muted-foreground">{new Date(data.date).toLocaleDateString()}</p>
        <p className="text-sm font-medium">{data.description}</p>
        <p className={`text-lg font-bold ${data.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(data.amount)}</p>
      </div>
    );
  }
  return null;
};

export function ClientDashboardChart({ data }: ClientDashboardChartProps) {
  const { resolvedTheme } = useTheme();

  const chartData = data.slice(0, 15).reverse().map(t => ({
    ...t,
    income: t.amount > 0 ? t.amount : 0,
    expense: t.amount < 0 ? -t.amount : 0,
    date: new Date(t.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
  }));
  
  const tickColor = resolvedTheme === 'dark' ? '#888888' : '#333333';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5}/>
        <XAxis 
            dataKey="date" 
            tick={{ fill: tickColor, fontSize: 12 }} 
            tickLine={{ stroke: tickColor }}
        />
        <YAxis 
            tickFormatter={(value) => formatCurrency(value)} 
            tick={{ fill: tickColor, fontSize: 12 }} 
            tickLine={{ stroke: tickColor }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}/>
        <Legend 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
        />
        <Bar dataKey="income" name="Revenus" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Dépenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

    