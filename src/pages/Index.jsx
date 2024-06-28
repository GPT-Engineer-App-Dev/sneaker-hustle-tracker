import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: uuidv4(), date: "2023-10-01", amount: 200, type: "Income", category: "Nike" },
    { id: uuidv4(), date: "2023-10-02", amount: 150, type: "Expense", category: "Adidas" },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: "", amount: "", type: "", category: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: uuidv4() }]);
    setNewTransaction({ date: "", amount: "", type: "", category: "" });
    setIsDialogOpen(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sneaker Accounting App</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={newTransaction.date}
              onChange={handleInputChange}
            />
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
            <Select onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;