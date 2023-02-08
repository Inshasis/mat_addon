
import frappe

def validate_abbr(doc,method):
		if not doc.supplier_abbr:
			doc.supplier_abbr = "".join(c[0] for c in doc.supplier_name.split()).upper()
            