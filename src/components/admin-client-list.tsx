
"use client";

import { useState } from "react";
import { Client, getClientsAction } from "@/app/actions/clients";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { PlusCircle, RefreshCw, User, Eye } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddClientForm } from "./admin-add-client-form";

interface AdminClientListProps {
  initialClients: Client[];
}

export function AdminClientList({ initialClients }: AdminClientListProps) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const refreshClients = async () => {
    setIsLoading(true);
    const { data } = await getClientsAction();
    if (data) {
      setClients(data);
    }
    setIsLoading(false);
  };
  
  const onClientAdded = () => {
    setIsFormOpen(false);
    refreshClients();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Clients ({clients.length})</h2>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={refreshClients} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer un nouveau client</DialogTitle>
                <DialogDescription>
                  Un numéro d'identification et des coordonnées bancaires seront générés automatiquement.
                </DialogDescription>
              </DialogHeader>
              <AddClientForm onClientAdded={onClientAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>N° d'identification</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Solde</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => {
                 const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);
                 return (
                    <TableRow key={client.email}>
                      <TableCell className="font-medium">{client.firstName} {client.lastName}</TableCell>
                      <TableCell>{client.identificationNumber}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell className="text-right">{formatCurrency(balance)}</TableCell>
                      <TableCell className="text-center">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin/dashboard/${client.identificationNumber}`}>
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                 )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucun client trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
