const express = require('express');
const router = express.Router();
const sequelize = require('../models/index').sequelize;

router.get('/', async (req, res, next) => {
    try{
        const today = new Date();
        const futureFifteenDays = new Date(today.setDate(today.getDate() + 15));

        const [results] = await sequelize.query(`
            SELECT 
                DATE(make_date) as day,
                COUNT(token_id) as sales_count,
                SUM(price) as total_income,
                HOUR(make_date) as hour,
                SUM(IF(HOUR(make_date)=hour, price, 0)) as total_income_per_hour
            FROM 
                NFTstatistics
            WHERE 
                make_date BETWEEN :today AND :futureFifteenDays
            GROUP BY 
                day, hour`, {
                    replacements: { today: today.toISOString(), futureFifteenDays: futureFifteenDays.toISOString() },
                    type: sequelize.QueryTypes.SELECT
        });

        return res.status(200).json({ statusCode :200 ,message :'OK' ,data: results});
    }
    catch(error){
      next(error);
    }
});

module.exports=router;
