
"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

// Using a fixed annual interest rate
const ANNUAL_INTEREST_RATE = 0.02; // 2%

interface AmortizationRow {
    month: number;
    interest: number;
    principal: number;
    remainingBalance: number;
}

interface LoanCalculatorProps {
    amount?: number;
    duration?: number;
    onAmountChange?: (value: number) => void;
    onDurationChange?: (value: number) => void;
    showCard?: boolean;
}

export function LoanCalculator({ 
    amount: initialAmount = 50000, 
    duration: initialDuration = 120, 
    onAmountChange, 
    onDurationChange,
    showCard = true,
}: LoanCalculatorProps) {
  const [_amount, setAmount] = useState(initialAmount);
  const [_duration, setDuration] = useState(initialDuration);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  useEffect(() => {
    if (initialAmount !== undefined) setAmount(initialAmount);
  }, [initialAmount]);

  useEffect(() => {
    if (initialDuration !== undefined) setDuration(initialDuration);
  }, [initialDuration]);

  useEffect(() => {
    const parsedAmount = isNaN(Number(_amount)) ? 0 : Number(_amount);
    const parsedDuration = isNaN(Number(_duration)) ? 0 : Number(_duration);

    if (parsedAmount <= 0 || parsedDuration <= 0) {
        setMonthlyPayment(0);
        setAmortizationSchedule([]);
        return;
    }

    const monthlyRate = ANNUAL_INTEREST_RATE / 12;
    const numberOfMonths = parsedDuration;
    
    let payment = 0;
    if (numberOfMonths > 0) {
        if (monthlyRate > 0) {
          payment =
            (parsedAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
            (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
          setMonthlyPayment(payment);
        } else {
          payment = parsedAmount / numberOfMonths;
          setMonthlyPayment(payment);
        }
    } else {
        setMonthlyPayment(0);
    }
    
    // Calculate amortization schedule
    if (payment > 0 && isFinite(payment)) {
        const schedule: AmortizationRow[] = [];
        let remainingBalance = parsedAmount;
        for (let i = 1; i <= numberOfMonths; i++) {
            const interest = remainingBalance * monthlyRate;
            const principal = payment - interest;
            remainingBalance -= principal;
            
            schedule.push({
                month: i,
                interest: interest,
                principal: principal,
                remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
            });
        }
        setAmortizationSchedule(schedule);
    } else {
        setAmortizationSchedule([]);
    }

  }, [_amount, _duration]);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber || 0;
      setAmount(value);
      if(onAmountChange) onAmountChange(value);
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber || 0;
      setDuration(value);
      if(onDurationChange) onDurationChange(value);
  }

  const CalculatorContent = () => (
    <>
      <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant du prêt (€)</Label>
            <Input
              id="amount"
              type="number"
              value={_amount}
              onChange={handleAmountChange}
              placeholder="ex: 50000"
              min="1000"
              max="500000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Durée du prêt (en mois)</Label>
            <Input
              id="duration"
              type="number"
              value={_duration}
              onChange={handleDurationChange}
              placeholder="ex: 120"
              min="12"
              max="360"
            />
          </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-muted-foreground">Votre mensualité estimée</p>
        <p className="text-4xl font-bold text-accent mt-2">
          {formatCurrency(monthlyPayment)}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
            Basé sur un taux d'intérêt annuel fixe de {ANNUAL_INTEREST_RATE * 100}%. Ceci est une estimation.
        </p>
      </div>

      {amortizationSchedule.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold text-center mb-4">Tableau d'Amortissement</h3>
            <ScrollArea className="h-72 w-full rounded-md border">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead className="w-[80px]">Mois</TableHead>
                            <TableHead className="text-right">Intérêts</TableHead>
                            <TableHead className="text-right">Capital</TableHead>
                            <TableHead className="text-right">Restant Dû</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {amortizationSchedule.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell className="font-medium">{row.month}</TableCell>
                                <TableCell className="text-right">{formatCurrency(row.interest)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(row.principal)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(row.remainingBalance)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
      )}
    </>
  )

  if (!showCard) {
    return (
        <div className="space-y-8">
            <CalculatorContent />
        </div>
    );
  }

  return (
    <Card className="shadow-lg w-full">
        <CardHeader>
            <CardTitle>Simulateur de prêt</CardTitle>
            <CardDescription>Estimez vos mensualités et consultez votre plan de remboursement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <CalculatorContent />
        </CardContent>
    </Card>
  );
}
