const mongoose = require('mongoose');

require('dotenv').config()

module.exports = {
    start(){
        try{

            mongoose.connect(process.env.DATABASE_CONNECT, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })

           console.log(` (DB) Successfuly connected to database ✅`)

        } catch (err) {
            if(err) return console.log(` (DB) - ❌ DATABASE THROW ERRORS: `, +err)
        }
    }
}