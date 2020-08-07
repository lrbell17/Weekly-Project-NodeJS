import Atm from './dollars_bank_atm.js';
import Account from './customer_account.js';

class Views {
 
    constructor(){
        this.atm = new Atm();
        this.account = "";
        this.accountCreated = false;
    }

    getMainMenu() {
        console.log("\n-----------------------------")
        console.log("DOLLARSBANK ATM Welcomes You!");
        console.log("-----------------------------\n")
        
        let mainMenuOption = this.atm.getMainMenuOption();
        
        if (mainMenuOption == 1){
            this.account = this.atm.createAccount();
            this.accountCreated = true;
            console.log("\nAccount created successfully!");
            this.getMainMenu();
        }
        else if (mainMenuOption == 2){
            if (this.accountCreated == true){
                this.getTransactionMenu();
            }
            else {
                console.log("\nYou have to create an account first!\n");
                this.getMainMenu();
            }
        }

    }

    getTransactionMenu(){
        console.log("\nTransaction Menu: \n");
        console.log("1 - Check Account Balance");
        console.log("2 - Print Transactions");
        console.log("3 - Update Pin");
        console.log("4 - Withdraw");
        console.log("5 - Deposit");

        let option = this.atm.getTransactionMenuOption();
        console.log(option);

        if (option == 1){
            console.log("\nYour balance is: $" + this.account.balance + "\n");
        }
        else if (option ==2){
            this.atm.getTransactions(this.account);
        }
        else if (option ==3){
            let pin1 = 0;
            let pin2 = 0;

            let valid = false;
            while(!valid){
                pin1 = this.atm.getPin(1);
                pin2 = this.atm.getPin(2);
                if (pin1 == pin2){
                    valid = true;
                    console.log("Pin updated sucessfully!")
                }
                else {
                    console.log("The pins don't match, try again!")
                }
            }
            this.account.pin = pin1;
        }
        else if (option == 4){
            let amount = this.atm.getWithdrawAmount(this.account);
            this.account.withdraw(amount);
            console.log("Withdrawl Sucessful! Your new balance is: " + this.account.balance)
        }
        else if (option == 5){
            let amount = this.atm.getDepositAmount();
            this.account.deposit(amount);
            console.log("Deposit Sucessful! Your new balance is: " + this.account.balance);
        }
        else {
            console.log("Invalid Entry!");
        }

        this.anotherTransaction();

    }

    anotherTransaction(){
        let option = this.atm.anotherTransaction();
        if (option =='y'){
            this.getTransactionMenu();
        }
        else if (option =='n'){
            this.getMainMenu();
        }
    }
}

export default Views;