const express = require('express');
const { NFTtrans } = require('../models');

const router = express.Router();

router.get('/checkReservationOrder', async (req, res, next) => {
  try {
    const ownerAddress = req.body.ownerAddress;

    // 데이터 검증 로직 추가
    if (!ownerAddress) {
      return next(new Error('Bad Request'));
    }

    // 해당 ownerAddress와 일치하는 모든 데이터를 가져온다.
    const [results] = await sequelize.query(`
      SELECT 
        token_id,
        to_address as "to",
        from_address as "from"
      FROM 
        NFTtrans
      WHERE 
        from_address=:ownerAddress`, {
          replacements: { ownerAddress },
          type: sequelize.QueryTypes.SELECT
    });

    // 가져온 데이터를 삭제한다.
    await sequelize.query(`
      DELETE FROM 
        NFTtrans
      WHERE 
        from_address=:ownerAddress`, {
          replacements: { ownerAddress },
          type: sequelize.QueryTypes.DELETE
    });

     return res.status(200).json({ statusCode :200 ,message :'OK', response : results});

   } catch (error) {

     console.error(error);
     
     // 에러를 미들웨어로 전달한다.
     next(error);
   }
});

router.post('/reservationOrder', async (req, res, next) => {
    const { token_id, to_address, contractAddress } = req.body;
    const from_address = "0x03EB037D0ecF7ce2c81eC1163f6251070996c32C"; // 고정된 값 사용

    try {
        await sequelize.query('CALL pc_NFTtrans_Create(:token_id,:to_address,:from_address,:contractAddress)', 
        { 
            replacements: { token_id, to_address, from_address, contractAddress }
        });

        res.status(200).json({
            "statusCode" : 200,
            "message" : "OK", 
        });
      
    } catch(err) {
       console.error(err);
       if (err instanceof Sequelize.ValidationError) {
           return res.status(400).json({ error: 'Bad Request' });
       }
       next(err); 
    }
});

module.exports = router;