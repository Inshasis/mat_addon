import frappe

@frappe.whitelist() 
def fetch_item_code(contract_name):
    items_name = []  
    scrapitems1 = frappe.db.sql("select item from `tabItem Detail` where parent = %s ", contract_name) 
    for item1 in scrapitems1: 
        items_name.append(item1[0]) 
    return items_name  

# Fetch Item UOM In Contract
@frappe.whitelist() 
def uom_fetch(name):
  items = []  
  scrapitems = frappe.db.sql("select uom from `tabItem Detail` where item = %s ", name) 
  for item in scrapitems: 
    
      items.append(item[0]) 
  return items 

# Fetch Item Rate In Contract 
@frappe.whitelist() 
def fetch_item_rate(uom,item_code):
  items_rate = frappe.db.sql(f""" SELECT price,item_name FROM `tabItem Detail` WHERE item='{item_code}' AND uom='{uom}' """, as_dict=True)
  return items_rate   

# Fetch Item Name In Contract
@frappe.whitelist() 
def fetch_item_name(item_code):
  items1 = frappe.db.sql(f""" SELECT item_name FROM `tabItem Detail` WHERE item='{item_code}' """, as_dict=True)
  return items1  
