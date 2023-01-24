global class SampleCommissionCalcualtion implements loan.ICommissionCalculation {
    global Decimal getCommissionAmount(loan__Loan_Account__c loanAccount, loan__Broker__c broker) {
    //Custom Logic
    Decimal Commissionamount = loanAccount.loan__Loan_Amount__c / loanAccount.loan__Term_Cur__c;
    
    return Commissionamount;
    }
}