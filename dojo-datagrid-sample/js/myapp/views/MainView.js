define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/MainView.html",
    "myapp/views/DataGridProgramicView",
    "myapp/views/DataGridDeclarativeView",
    "myapp/views/DataGridCustomView"
], function(declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        startup: function(){
            this.inherited(arguments);
        }
    });
});
