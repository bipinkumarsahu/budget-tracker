import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudgets(){
 return useContext(BudgetContext);
}
export const BudgetProvider = ({children})=>{

    const [budgets, setBudgets] = useLocalStorage( "budgets",[]);
    const [expenses,setExpense] = useLocalStorage( "expenses", []);
    const getBudgetExpenses = (budgetId)=>{
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const addBudget = ({name, max})=>{
        setBudgets(prevBudget =>{
            if(prevBudget.find(budget => budget.name === name)){
                return prevBudget;
            }
            return [...prevBudget, {id: v4(), name, max}];
        })
    }

    const addExpense = ({desc, amount, budgetId})=>{
        setExpense( prevExpense=>{
            return [...prevExpense, {id: v4(), desc, amount, budgetId}]
        })
    }

    const deleteBudget = ({id})=>{
        setBudgets(prevBudget =>{
            return prevBudget.filter(budget => budget.id !== id)
        })
    }

    const deleteExpense = ({id})=>{
        setExpense(prevExpense =>{
            return prevExpense.filter(expense => expense.id !== id)
        })
    }


    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}