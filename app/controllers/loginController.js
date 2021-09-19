const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult, header} = require('express-validator');
const connection = require('../models/db.js').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await connection.execute(
            "SELECT * FROM `customers` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        res.cookie('azubiToken', theToken);

		return res.json({
			status: 'ok'
        });

    }
    catch(err){
        next(err);
    }
}