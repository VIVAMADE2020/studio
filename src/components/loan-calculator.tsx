
"use client";

import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
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
    amount: number;
    duration: number;
    onAmountChange: (value: number) => void;
    onDurationChange: (value: number) => void;
    showCard?: boolean;
}

export function LoanCalculator({ 
    amount, 
    duration, 
    onAmountChange, 
    onDurationChange,
    showCard = true,
}: LoanCalculatorProps) {
  const [_amount, setAmount] = useState(amount);
  const [_duration, setDuration] = useState(duration);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  useEffect(() => {
    setDuration(duration);
  }, [duration]);

  useEffect(() => {
    const monthlyRate = ANNUAL_INTEREST_RATE / 12;
    const numberOfMonths = _duration;
    
    let payment = 0;
    if (numberOfMonths > 0) {
        if (monthlyRate > 0) {
          payment =
            (_amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
            (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
          setMonthlyPayment(payment);
        } else {
          payment = _amount / numberOfMonths;
          setMonthlyPayment(payment);
        }
    } else {
        setMonthlyPayment(0);
    }
    
    // Calculate amortization schedule
    if (payment > 0) {
        const schedule: AmortizationRow[] = [];
        let remainingBalance = _amount;
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

  const handleAmountChange = (value: number[]) => {
      setAmount(value[0]);
      onAmountChange(value[0]);
  }

  const handleDurationChange = (value: number[]) => {
      setDuration(value[0]);
      onDurationChange(value[0]);
  }
  
  const durationInYears = (_duration / 12).toFixed(1).replace('.0', '');

  const CalculatorContent = () => (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="amount">Montant du prêt</Label>
          <span className="font-bold text-primary text-lg">{formatCurrency(_amount)}</span>
        </div>
        <Slider
          id="amount"
          min={1000}
          max={500000}
          step={1000}
          value={[_amount]}
          onValueChange={handleAmountChange}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(1000)}</span>
            <span>{formatCurrency(500000)}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <Label htmlFor="duration">Durée du prêt</Label>
            <span className="font-bold text-primary text-lg">{_duration} mois ({durationInYears} an{parseFloat(durationInYears) > 1 ? 's' : ''})</span>
        </div>
        <Slider
          id="duration"
          min={12}
          max={360}
          step={1}
          value={[_duration]}
          onValueChange={handleDurationChange}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
            <span>12 mois</span>
            <span>360 mois</span>
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
