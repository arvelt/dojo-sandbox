define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/MainView.html",
    "dijit/form/TextBox"
], function(declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, TextBox){
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        welcomeText: null,
        postCreate: function(){
            this.inherited(arguments);
            this.welcomeText = new TextBox({
                value: 'Hi welcome.'
            }, this.inputNode)
        },
        startup: function(){
            this.inherited(arguments);
            console.log(this.inputNode);
            console.log(this.greetingText);
            console.log(this.welcomeText);
        }
    });
});
