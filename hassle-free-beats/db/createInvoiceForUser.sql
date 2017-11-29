INSERT INTO invoice (invoice_date, total, customer_id) VALUES ($1, $2, $3) RETURNING invoice.invoice_id;
