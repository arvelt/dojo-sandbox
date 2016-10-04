define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojox/grid/DataGrid",
    "dojo/data/ItemFileWriteStore",
    "dojo/text!./templates/DataGridDeclarativeView.html"
], function(declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, DataGrid, ItemFileWriteStore, template){
    return declare('myapp/views/DataGridDeclarativeView', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        startup: function(){
            this.inherited(arguments);
        }
    });
});
