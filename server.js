const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json({ extented: false }));

const conn = mysql.createConnection({
	host: 'hiring.cyvxdrx2iv4i.us-east-2.rds.amazonaws.com',
	user: 'hiring',
	password: 'notetakingexpress',
	database: 'classicmodels'
});

// APP PORT & LISTEN
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Express Back End Server Started');
});

conn.connect(function(err) {
	if (err) throw err;
	conn.query(
		`SELECT o.comments FROM classicmodels.orders o
      JOIN customers c ON o.customerNumber = c.customerNumber
      JOIN employees e ON c.salesRepEmployeeNumber = e.employeeNumber
      WHERE o.comments IS NOT null
      AND e.employeeNumber = 1165
      ORDER BY orderDate DESC
      LIMIT 2, 1`,
		function(err, result, fields) {
			if (err) throw err;
			console.log(result[0].comments); //Customer requested that DHL is used for this shipping
			app.use((req, res, next) => {
				res.send(`<p>${result[0].comments}</p>`);
			});
		}
	);
});

// SQL ANSWER
//
// Customer requested that DHL is used for this shipping
