"use client";

import { dummyTransactions } from "@/lib/data"
import { transaction_column } from "../columns/transaction-column"
import { DataTable } from "../ui/data-table"

export function TransactionTable(){
       return( <DataTable columns={transaction_column} data={dummyTransactions}/>)
}