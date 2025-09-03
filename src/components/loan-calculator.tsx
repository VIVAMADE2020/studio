"use client";

import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Using a fixed annual interest rate
const ANNUAL_INTEREST_RATE = 0.02; // 2%

export function LoanCalculator() {
  const [amount, setAmount] = useState(50000);
  const [duration, setDuration] = useState(120); // in months
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const monthlyRate = ANNUAL_INTEREST_RATE / 12;
    const numberOfMonths = duration;
    
    if (numberOfMonths > 0) {
        if (monthlyRate > 0) {
          const payment =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
            (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
          setMonthlyPayment(payment);
        } else {
          setMonthlyPayment(amount / numberOfMonths);
        }
    } else {
        setMonthlyPayment(0);
    }
  }, [amount, duration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const handleAmountChange = (value: number[]) => {
      setAmount(value[0]);
  }

  const handleDurationChange = (value: number[]) => {
      setDuration(value[0]);
  }
  
  const durationInYears = (duration / 12).toFixed(1).replace('.0', '');


  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="amount">Montant du prêt</Label>
          <span className="font-bold text-primary text-lg">{formatCurrency(amount)}</span>
        </div>
        <Slider
          id="amount"
          min={1000}
          max={500000}
          step={1000}
          value={[amount]}
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
            <span className="font-bold text-primary text-lg">{duration} mois ({durationInYears} an{parseFloat(durationInYears) > 1 ? 's' : ''})</span>
        </div>
        <Slider
          id="duration"
          min={12}
          max={360}
          step={1}
          value={[duration]}
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
    </div>
  );
}
