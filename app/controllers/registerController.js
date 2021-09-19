const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const connection = require('../models/db.js').promise();

exports.register = async(req,res,next) => {
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			return res.status(422).json({ errors: errors.array() });
		}

		try{

			const [row] = await connection.execute(
				"SELECT `email` FROM `customers` WHERE `email`=?",
				[req.body.email]
			  );

			if (row.length > 0) {
				return res.status(201).json({
					message: "The E-mail already in use",
				});
			}

			const hashPass = await bcrypt.hash(req.body.password, 12);

			const [rows] = await connection.execute('INSERT INTO `customers`(`name`,`email`,`password`) VALUES(?,?,?)',[
				req.body.name,
				req.body.email,
				hashPass
			]);

			if (rows.affectedRows === 1) {
				return res.status(201).json({
					message: "The user has been successfully inserted.",
					status: 'ok'
				});
			}
			
		}catch(err){
			next(err);
		}
	}