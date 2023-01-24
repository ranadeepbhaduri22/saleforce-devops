(function(skuid){
skuid.snippet.register('SelectFirstEntryInQueue',function(args) {var params = arguments[0],
  $ = skuid.$;

$(function() {
    var pageInclude = skuid.$('#relationship-dashboard').data('object');
    pageInclude.load(function() {
        clickQueueEntry(true, sessionStorage.selectedPartyId);
    });
});

function clickQueueEntry(force, partyId) {
    sessionStorage.removeItem('selectedPartyId');
    if (partyId) {
        var clickIndex = 0;
        $.each(skuid.model.getModel('DashboardParty').data, function(index, party) {
            if (party.Id === partyId) {
                clickIndex = index;
                return false;
            }
        });
        $($('#relationship-queue .nx-item.nx-queue-item')[clickIndex]).trigger('click');
    } else {
        if (force) {
            $($('#relationship-queue .nx-item.nx-queue-item')[0]).trigger('click');
        }
    }
}
});
skuid.snippet.register('AdjustLayoutRelationshipDashboard',function(args) {var params = arguments[0],
  $ = skuid.$;

if (sessionStorage.refreshParty) {
    sessionStorage.removeItem('refreshParty');
    var pageInclude = skuid.$('#relationship-dashboard').data('object');
    pageInclude.load(function() {
        clickQueueEntry(true, sessionStorage.selectedPartyId);
    });
} else {
    clickQueueEntry(false, sessionStorage.selectedPartyId);
}

function clickQueueEntry(force, partyId) {
    skuid.model.updateData([skuid.model.getModel('DashboardParty')],function(){
        if (partyId) {
            var clickIndex = 0;
            $.each(skuid.model.getModel('DashboardParty').data, function(index, party) {
                if (party.Id === partyId) {
                    clickIndex = index;
                    return false;
                }
            });
            $($('#relationship-queue .nx-item.nx-queue-item')[clickIndex]).trigger('click');
        } else {
            if (force) {
                $($('#relationship-queue .nx-item.nx-queue-item')[0]).trigger('click');
            }
        }
    });
}
});
skuid.snippet.register('LaunchEditLoanDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var appRowData = skuid.model.getModel('NGLDApplication').data[0];
var appId = appRowData.Id;
var title = 'Edit Opportunity ' + appRowData.Name;
var skuidPage = 'ApplicationForm';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchCreditMemoDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Manage Credit Memo';
var skuidPage = 'CreditMemo';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchChangeMemoDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var title = 'Manage Change Memo';

var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var skuidPage = 'ChangeMemos';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
  title: title,
  iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchFeeDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Manage Fees';
var skuidPage = 'Fees';

// launchSimplePopupDialog(appId, title, skuidPage);

var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchPolicyExceptionDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Manage Policy Conditions';
var skuidPage = 'PolicyExceptions';

// launchSimplePopupDialog(appId, title, skuidPage);

var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('AddTooltipCollateralTab',function(args) {var params = arguments[0],
  $ = skuid.$;

$(function() {
    var pageInclude = skuid.$('#collateral-tab').data('object');
    pageInclude.load(function() {
        openLinksInNewTab();
      showIconicBtnLabelAsTooltip();
    });
});
});
skuid.snippet.register('LaunchLoanHistoryDialog',function(args) {var params = arguments[0],
  $ = skuid.$;

var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'View Renewal History';
var skuidPage = 'RenewalHistory';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchCovenantsDialog',function(args) {var params = arguments[0],
  $ = skuid.$;
var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'View Covenants';
var skuidPage = 'ApplicationCovenant';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('refreshDocument',function(args) {var params = arguments[0],
  $ = skuid.$;

if(sessionStorage.refreshDocument) {
    sessionStorage.removeItem('refreshDocument');
    $('#document-iframe')[0].contentWindow.postMessage({type: 'action-refresh-tree-details'}, '*');
}
});
(function(skuid){
  var $ = skuid.$;
  $(document.body).one('pageload',function(){
      showIconicBtnLabelAsTooltip();

      var applicationData = skuid.model.getModel('NGLDApplication').getFirstRow();
      if(applicationData && applicationData.genesis__Product_Type__c && applicationData.genesis__Product_Type__c == 'PACKAGE'){
          $('#loan-dashboard-parties-section').css('top','0');
          $('#loan-dashboard-parties-section').css('bottom','0');


      }

      if(applicationData.genesis__Product_Type__c == 'LEASE') {
         $('#ui-id-1').text('Lease');// Fix for tab name change based on conditions
      }


  });
})(skuid);;
skuid.snippet.register('LaunchRiskAnalysis',function(args) {var params = arguments[0],
	$ = skuid.$;
var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Risk Analysis';
var skuidPage = 'ApplicationRiskAnalysis';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchSchedule',function(args) {var params = arguments[0],
	$ = skuid.$;
var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Payment Schedule';
var skuidPage = 'paymentSchedule';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('LaunchAdverseAction',function(args) {var params = arguments[0],
	$ = skuid.$;
var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Adverse Action';
var skuidPage = 'AdverseAction';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
skuid.snippet.register('reLoad',function(args) {var params = arguments[0],
	$ = skuid.$;
window.location.reload(true);
});
skuid.snippet.register('LaunchDebtToIncomeRatio',function(args) {var params = arguments[0],
	$ = skuid.$;
var appId = skuid.model.getModel('NGLDApplication').data[0].Id;
var title = 'Debt to Income Ratio';
var skuidPage = 'DebtToIncomeRatio';
var iframeUrl = '/apex/skuid__ui?page=' + skuidPage + '&id=' + appId;

openTopLevelDialog({
    title: title,
    iframeUrl: iframeUrl
});
});
}(window.skuid));