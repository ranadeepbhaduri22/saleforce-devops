(function(skuid){
skuid.snippet.register('UpdateParty',function(args) {var params = arguments[0],
$ = skuid.$;

var pageTitle = $('#EditPartyTitlePanel');
var editor = pageTitle.data('object').editor;


/*
    Handle error messages

    For printing error messages: use return functionName() as syntax
    For printing non error(INFO,WARNING) messages: use functionName() as syntax without any 'return' preceding function name
*/
var displayMessage = function (message, severity) {

    if(severity == 'ERROR') {
        console.log('error');
        editor.handleMessages([
            {
                message: message,
                severity: severity.toUpperCase()
            }
        ]);

        return false;
    } else {
        console.log('info');
        editor.handleMessages([
            {
                message: message,
                severity: severity.toUpperCase()
            }
        ]);

        //return true;
    }
};

var newPartyModel = skuid.model.getModel('EditNGParty');
var newPartyRow = newPartyModel.data[0];

var newAccountModel = skuid.model.getModel('EditNGPartyAccount');
var newAccountRow = newAccountModel.data[0];

var newContactModel = skuid.model.getModel('EditNGPartyContact');
var newContactRow = newContactModel.data[0];

if(newContactRow)
{
    let birthDate = newContactRow.Birthdate;
    let today = $.datepicker.formatDate('yy-mm-dd', new Date());
    
    if (birthDate === '' || birthDate === null || birthDate === undefined || birthDate>today ) {
        return displayMessage('BirthDate cannot be future date or blank.','ERROR');
    }
    if((newContactRow.clcommon__Years_At_Current_Address__c === undefined||newContactRow.clcommon__Years_At_Current_Address__c<1)||(newContactRow.clcommon__Years_At_Current_Address__c==1&&(newContactRow.clcommon__Months_at_current_address__c>=0||newContactRow.clcommon__Months_at_current_address__c===undefined )))
    {
        if(!(newContactRow.OtherStreet&&newContactRow.OtherCity&&newContactRow.OtherState&&newContactRow.OtherPostalCode&&newContactRow.OtherCountry))
        {
            return displayMessage('Previous address cannot be blank', 'ERROR');
        }
    }
}


var businessInfoModel = skuid.model.getModel('EditNGAccountBusinessInfo');
var businessInfoRow = businessInfoModel.data[0];

var collateralOwnerModel = skuid.model.getModel('EditNGCollateralOwner');
var collData = [];
collateralOwnerModel.data.forEach(function (colDataObj){
    if(!collateralOwnerModel.isRowMarkedForDeletion(colDataObj) && colDataObj.clcommon__Collateral__c){
        collData.push(colDataObj);
    }
});
collateralOwnerModel.data = collData;



if(!newPartyRow.clcommon__Type__c){
    return displayMessage('Select Party Type for Party.','ERROR');
}

var partyArgs = {};
if(newContactRow && newContactRow.LastName){
    partyArgs[0] = newContactModel;

    if(newContactRow.clcommon__Legal_Entity_Type__c === undefined || newContactRow.clcommon__Legal_Entity_Type__c === '') {
        return displayMessage('Select Legal Entity Type for Contact.','ERROR');
    }
}else{
    partyArgs[0] = null;
}
if(newAccountRow && newAccountRow.Name){
    partyArgs[1] = newAccountModel;

    if(newAccountRow.clcommon__Legal_Entity_Type__c === undefined || newAccountRow.clcommon__Legal_Entity_Type__c === '') {
        return displayMessage('Select Legal Entity Type for Account.','ERROR');
    }
}else{
    partyArgs[1] = null;
}


var bModel = businessInfoModel;
if (Object.keys(businessInfoModel.data[0]).length <= 2){
    bModel = null;
}

var res = saveParty(newPartyModel,partyArgs[0],partyArgs[1],bModel,collateralOwnerModel);
var resObj = JSON.parse(res);
if(resObj.status == 'SUCCESS'){
    displayMessage('Record is successfully saved!','INFO');
    closeTopLevelDialogAndRefresh({iframeIds: ['deal-dashboard-iframe,relationship-iframe']});
}else{
    $("#PartySaveButton").button('enable');
    return displayMessage(resObj.errorMessage,'ERROR');

}
});
skuid.snippet.register('CloseDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

closeTopLevelDialogAndRefresh();
});
}(window.skuid));