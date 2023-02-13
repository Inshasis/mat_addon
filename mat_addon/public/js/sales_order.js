// Fetch Item Code In Contract
frappe.ui.form.on('Sales Order', {
    contract: function (frm, cdt, cdn) {
        
        frappe.call({
            method: 'mat_addon.mat_addon.doctype.sales_order.sales_order.fetch_item_code',
            args: {
                contract_name: cur_frm.doc.contract,
            },
            callback: function (r) {
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("item_code", "items", function (doc, cdt, cdn) {
                        var d = locals[cdt][cdn];
                        return {
                            filters: [
                                ['Item', 'name', 'in', r.message]
                            ]
                        };
                    });
                }
            }
        });
    }
});


// Fetch Item UOM In Contract
frappe.ui.form.on('Sales Order Item', {
    item_code: function (frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        frappe.call({
            method: 'mat_addon.mat_addon.doctype.sales_order.sales_order.uom_fetch',
            args: {
                name: d.item_code,
            },
            callback: function (r) {
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("uom", "items", function (doc, cdt, cdn) {
                        var d = locals[cdt][cdn];
                        return {
                            filters: [
                                ['UOM', 'name', 'in', r.message]
                            ]
                        };
                    });
                }
            }
        });
    }
});

// Fetch Item Rate In Contract
frappe.ui.form.on('Sales Order Item', "uom",function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
        frappe.call({
            method:"mat_addon.mat_addon.doctype.sales_order.sales_order.fetch_item_rate",
            args:{
                uom:d.uom,
                item_code: d.item_code,
            },
            callback:function(r){
                console.log(r);
                if(r.message[0]){
                    frappe.model.set_value(cdt,cdn,'rate',r.message[0].price);
                    frappe.model.set_value(cdt,cdn,'item_names',r.message[0].item_name);
                }
            }
        });

});

// Fetch Item Name In Contract
frappe.ui.form.on('Sales Order Item', "item_code",function(frm,cdt,cdn){
        var d = locals[cdt][cdn];
            
        frappe.call({
            method:"mat_addon.mat_addon.doctype.sales_order.sales_order.fetch_item_name",
            args:{
                item_code:d.item_code
            },
            callback:function(r){
                if(r.message[0]){
                    frappe.model.set_value(cdt,cdn,'item_names',r.message[0].item_name);
                }
            }
        });
    
});