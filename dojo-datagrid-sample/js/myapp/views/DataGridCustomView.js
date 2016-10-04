define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/_base/event",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/store/JsonRest",
    "dojo/data/ObjectStore",
    "dojo/text!./templates/DataGridCustomView.html",
    "dijit/form/Button",
    "dojox/grid/_CheckBoxSelector"
], function(declare, lang, array, on, event, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, JsonRest, ObjectStore, template){
    return declare('myapp/views/DataGridCustomView', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        dataStore: new JsonRest({target: '/js/_data/states.json'}),
        postCreate: function(){
            this.inherited(arguments);
            this.grid.setStore(new ObjectStore({'objectStore': this.dataStore}));

            // Layout
            //   Note.
            //   When declarative definition used, 'dojox.grid.__ViewDef' is not available.
            //   Get the structure with a declarative definitions, and this sets again.
            //   FIXME If layout is changed, originalStructure should change cells-value.
            var originalStructure = this.grid.get('structure');
            var newStructure = [
                {
                    type:'dojox.grid._CheckBoxSelector'
                },
                {
                    cells: originalStructure[0].cells
                }
            ];
            this.grid.setStructure(newStructure);

            // Add new item
            // FIXME Id needs Uniqueness. But it should be provided from server.
            this.newButton.on('click', lang.hitch(this, function(e){
                var item = {
                    "id": Math.floor((Math.random().toString() * 100) + 100),
                    "name": "New item",
                    "label": "New item",
                    "abbreviation": "AK",
                    "capital": "bew"
                };
                this.grid.store.newItem(item);
            }));

            // Delete item
            // FIXME Http delete request is not generated.
            on(this.deleteButton,'click', lang.hitch(this, function(e){
                var items = this.grid.selection.getSelected();
                if(items.length){
                    array.forEach(items, lang.hitch(this, function(selectedItem){
                        if(selectedItem !== null){
                            this.grid.store.deleteItem(selectedItem);
                        }
                    }));
                }
                event.stop(e);
            }));

            // Get clicked cell
            this.grid.on('click', lang.hitch(this, function(e){
                console.log('rowIndex ->', e.rowIndex, 'cell ->', e.cell)
            }));

            // Filter
            this.filterButton.on('click', lang.hitch(this, function(e){
                /* Filter the movies from the data store: */
                console.log('click filterButton', e)
                this.grid.filter({abbreviation: 'AK'}); // FIXME Need api like url?abbreviation=AK
            }));

            // Sort
            // When a column is clicked, run a request to 'url?sort(+columnName)'.
            // FIXME Need api like url?sort(+name)

            // Get selected Item
            this.getSelectedItem.on('click', lang.hitch(this, function(e){
                var items = this.grid.selection.getSelected();
                if(items.length) {
                    array.forEach(items, lang.hitch(this, function(selectedItem){
                        if(selectedItem !== null){
                            console.log('selectedItem', selectedItem)
                                array.forEach(this.grid.store.getAttributes(selectedItem), lang.hitch(this, function(attribute){
                                var value = this.grid.store.getValues(selectedItem, attribute);
                                console.log('attribute: ' + attribute + ', value: ' + value);
                            }));
                        }
                    }));
                }
                event.stop(e);
            }));

            //mouse over event
            this.grid.on('CellMouseOver', lang.hitch(this, function(e){
                //console.log('CellMouseOver', e)
            }));
            this.grid.on('CellMouseOut', lang.hitch(this, function(e){
                //console.log('CellMouseOut', e)
            }));
            this.grid.on('RowMouseOver', lang.hitch(this, function(e){
                //console.log('CellRowMouseOver', e)
            }));
            this.grid.on('RowMouseOut', lang.hitch(this, function(e){
                //console.log('CellRowMouseOut', e)
            }));

        },
        startup: function(){
            this.inherited(arguments);
            console.log(this.grid)
            console.log('rows', this.grid.get('rowCount'), 'of', this.grid.get('keepRows'));
            console.log('getCell',this.grid.getCell(0));
            //var value = this.grid.store.getValue(this.grid.getItem(rowIndex), 'abbreviation'); //FIXME this.grid.getItem(rowIndex) is null.
        }
    });
});
