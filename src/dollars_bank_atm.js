import { stdin } from "process";
import readlineSync from 'readline-sync';
import Account from './customer_account.js';
import Transaction from './transaction.js';

class Atm {


    getMainMenuOption(){

        while(true){
            let option = readlineSync.question("Enter a valid choice (1 --> Open New Account, 2 --> Transaction, ctrl+c" 
                + " --> quit): ");

            if (option==1 || option ==2){
                return option;
            }
            else {
                console.log("Invalid Entry!")
            }
        }

    }

    getInitialDeposit(){
        const regex  = /^\d+(?:\.\d{0,2})$/; // 2 decimal place formar
        const regex2 = 	/^\d+$/; // regular int format
        while(true){
            let initialDeposit = readlineSync.question("\nEnter initial deposit amount : ")
            
            if (regex.test(initialDeposit) || regex2.test(initialDeposit)){
                
                return Number.parseFloat(initialDeposit).toFixed(2); // return desired format -> 2 deimal places
            }
            else {
                console.log("Invalid Entry!")
            }
        }   
    }

    getPin(version){
        const regex  = /^\d{4}$/;
        let pin = 0;
        while(true){
            if (version ==1){
                pin = readlineSync.question("\nEnter a 4 digit pin : ");
            }
            else if (version ==2) {
                pin = readlineSync.question("\nVerify Pin : ");
            }
            
            if (regex.test(pin)){
                return pin;
            }
            else {
                console.log("Invalid Entry!")
            }
        }  
    }

    createAccount(){
        let initialDeposit = this.getInitialDeposit();
        let pin1 = 0;
        let pin2 = 0;

        let valid = false;
        while(!valid){
            pin1 = this.getPin(1);
            pin2 = this.getPin(2);
            if (pin1 == pin2){
                valid = true;
            }
            else {
                console.log("The pins don't match, try again!")
            }
        }

        return new Account(initialDeposit, pin1);
    }

    getTransactionMenuOption(){

        while(true){
            let option = readlineSync.question("\nEnter a valid choice (1 -5): ");

            if (option==1 || option ==2 || option ==3 || option ==4 || option ==5){
                return option;
            }
            else {
                console.log("Invalid Entry!")
            }
        }

    }

    getTransactions(account) {

        account.transactions.forEach(trans => 
            console.log(trans))
        
    }

    getWithdrawAmount(account){
        const regex  = /^\d+(?:\.\d{0,2})$/; // 2 decimal place formar
        const regex2 = 	/^\d+$/; // regular int format

        const balance = account.balance;

        while(true){
            let amount = readlineSync.question("\nEnter a withdrawl amount : ");

            if ((regex.test(amount) || regex2.test(amount)) && balance >= Number.parseFloat(amount)){
                
                return Number.parseFloat(amount).toFixed(2); // return desired format -> 2 deimal places
            }
            else if (balance < Number.parseFloat(amount)) {
                console.log("Insufficient Funds!");
            }
            else {
                console.log("Invalid Entry!")
            }
        }   
    }

    getDepositAmount(){
        const regex  = /^\d+(?:\.\d{0,2})$/; // 2 decimal place formar
        const regex2 = 	/^\d+$/; // regular int format

        while(true){
            let amount = readlineSync.question("\nEnter a deposit amount : ");

            if (regex.test(amount) || regex2.test(amount)){
                
                return Number.parseFloat(amount).toFixed(2); // return desired format -> 2 deimal places
            }
            else {
                console.log("Invalid Entry!")
            }
        }   
    }

    anotherTransaction(){
        while(true){
            let option = readlineSync.question("\nPerform another transaction? (y/n): ");

            if (option=='y' || option =='n'){
                return option;
            }
            else {
                console.log("Invalid Entry!")
            }
        }
    }
}

export default Atm;