
import frappe

def validate_abbr(doc,method):
		if not doc.employee_abbr:
			doc.employee_abbr = "".join(c[0] for c in doc.designation.split()).upper()
            