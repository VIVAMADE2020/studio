
"use client";

import { Transaction } from "@/app/actions/clients";
import { useEffect, useState } from "react";
import { CheckCircle, Loader, CircleDotDashed } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TransactionProgressProps {
    transaction: Transaction;
}

const steps = [
    { name: "Initié", progress: 0 },
    { name: "En traitement", progress: 5 },
    { name: "Arrivée prévue", progress: 95 },
]

export function TransactionProgress({ transaction }: TransactionProgressProps) {
    const [progress, setProgress] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            if (!transaction.estimatedCompletionDate) return 0;

            const startTime = new Date(transaction.date).getTime();
            const endTime = new Date(transaction.estimatedCompletionDate).getTime();
            const now = new Date().getTime();

            if (now >= endTime) return 100;
            if (now <= startTime) return 0;

            const totalDuration = endTime - startTime;
            const elapsed = now - startTime;

            return (elapsed / totalDuration) * 100;
        };

        setProgress(calculateProgress());

        const interval = setInterval(() => {
            setProgress(calculateProgress());
        }, 10000); // Mettre à jour toutes les 10 secondes

        return () => clearInterval(interval);
    }, [transaction.date, transaction.estimatedCompletionDate]);

    useEffect(() => {
        let activeStep = 0;
        for (let i = steps.length - 1; i >= 0; i--) {
            if (progress >= steps[i].progress) {
                activeStep = i;
                break;
            }
        }
        setCurrentStepIndex(activeStep);
    }, [progress]);

    if (!transaction.estimatedCompletionDate) return null;
    
    return (
        <div className="w-full">
            <div className="relative h-1 w-full rounded-full bg-secondary">
                <div 
                    className="absolute h-1 rounded-full bg-primary transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
             <div className="flex justify-between items-center text-xs text-muted-foreground mt-1.5">
                {steps.map((step, index) => (
                     <div key={step.name} className={cn("flex items-center gap-1", { "text-primary font-medium": index === currentStepIndex })}>
                         {index === currentStepIndex && <Loader className="h-3 w-3 animate-spin" />}
                         {index < currentStepIndex && <CheckCircle className="h-3 w-3 text-green-500" />}
                         {index > currentStepIndex && <CircleDotDashed className="h-3 w-3" />}
                        <span>{step.name}</span>
                    </div>
                ))}
            </div>
            <div className="text-xs text-muted-foreground text-right mt-1">
                {new Date(transaction.estimatedCompletionDate).toLocaleString('fr-FR')}
            </div>
        </div>
    )
}

    