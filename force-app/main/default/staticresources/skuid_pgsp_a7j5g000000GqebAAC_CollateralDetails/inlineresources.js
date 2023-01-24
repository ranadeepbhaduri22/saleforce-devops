(function(skuid){
skuid.snippet.register('fieldRenderMode',function(args) {var field = arguments[0],
    value = arguments[1];

var model = skuid.$M('SelectedApplicationCollateral');
var renderMode = model.conditions[1].value;
if(renderMode !== 'read') {
    renderMode = 'edit';
}
// var renderMode = skuid.page.params.mode;
fieldModeToRender(field,value,renderMode);
});
skuid.snippet.register('CloseDialog',function(args) {var params = arguments[0],
	$ = skuid.$;

closeTopLevelDialogAndRefresh({divIds: ['deal-dashboard-iframe,collateral-tab']});
});
skuid.snippet.register('isReadMode',function(args) {var params = arguments[0],
	$ = skuid.$;
var model = skuid.$M('SelectedApplicationCollateral');
var renderMode = model.conditions[1].value;
return renderMode !== 'read';
});
}(window.skuid));