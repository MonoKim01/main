const express = require('express');
const { NftToken, NftSale } = require('../models');
const { v4: uuidv4 } = require('uuid'); // UUID 생성을 위한 라이브러리

const router = express.Router();

// 카테고리 조회
router.get('/categoryList', async (req, res, next) => {
    const category = "숙박시설";

    try {
        const nftList = await NftToken.findAll({
            where: { category },
            include: [{
                model: NftSale,
                required: true
            }]
        });
        
       if (!nftList || nftList.length === 0){
           throw new Error("No NFT found");
       }

       res.status(200).json({
           "statusCode" : 200,
           "message" : "OK", 
           "response" : nftList,
       });
        
   } catch (err) {
       next(err); 
   }
});

router.post('/resell', async (req, res, next) => {
    const { contractAddress, tokenId, discount_rate } = req.body.nftInfo.Info;
    const sale_id = uuidv4(); // 중복되지 않는 랜덤값 생성

    try {
        // 판매 목록에 NFT 재등록
        await sequelize.query('CALL pc_NFTsale_Create(:sale_id,:token_id,:discount_rate)', 
        { 
            replacements: { sale_id, token_id: tokenId, discount_rate }
        });

        res.status(201).json({
            "statusCode" : 201,
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