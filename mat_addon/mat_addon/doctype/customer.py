
import frappe

def validate_abbr(doc,method):
		if not doc.customer_abbr:
			doc.customer_abbr = "".join(c[0] for c in doc.customer_name.split()).upper()
            