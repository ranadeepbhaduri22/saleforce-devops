(function(skuid){
skuid.snippet.register('newSnippet',function(args) {var total_amount = document.getElementById('Total_Amount_Loan');
var fees_amount = document.getElementById('genesis__Fees_Amount__c');
var loan_amount = document.getElementById('genesis__Loan_Amount__c');

total_amount.value = fees_amount.value + loan_amount.value;
});
}(window.skuid));