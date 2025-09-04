
"use client";

import { LoanDetails } from "@/app/actions/clients";
import { formatCurrency } from "@/lib/utils";

interface LoanDetailsCardProps {
    loanDetails: LoanDetails;
}

const DetailItem = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-semibold text-primary">{value}</span>
    </div>
);


export function LoanDetailsCard({ loanDetails }: LoanDetailsCardProps) {
    const {
        loanAmount,
        interestRate,
        loanTerm,
        repaymentStartDate,
        monthlyPayment
    } = loanDetails;

    return (
        <div className="space-y-2">
            <DetailItem label="Montant Emprunté" value={formatCurrency(loanAmount)} />
            <DetailItem label="Taux d'intérêt" value={`${interestRate}%`} />
            <DetailItem label="Durée du Prêt" value={`${loanTerm} mois`} />
            <DetailItem label="Mensualité" value={formatCurrency(monthlyPayment)} />
            <DetailItem label="Début du remboursement" value={new Date(repaymentStartDate).toLocaleDateString('fr-FR')} />
        </div>
    );
}
