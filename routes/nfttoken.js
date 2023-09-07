const express = require('express');
const router = express.Router();
const NFTToken = require('../models/nfttoken');

router.post('/saleNFT', async (req, res) => {
  try {
    const nftInfo = req.body.nftInfo.Info;
    
    // nftInfo.category 값을 "숙박시설"로 고정
    nftInfo.category = "숙박시설";

    // 데이터 검증 로직에서 nftInfo.category의 존재 여부 확인을 제거
    if (!nftInfo.contractAddress || !nftInfo.tokenId || !nftInfo.price) {
      return res.status(400).json({ statusCode: 400, message: 'Bad Request' });
    }

    // Call the stored procedures to insert data into the tables.
    await sequelize.query('CALL pc_NFTtoken_Create(:tokenId, :price, :category)', 
      { replacements: { tokenId: nftInfo.tokenId, price: nftInfo.price, category: nftInfo.category } }
    );
    
    await sequelize.query('CALL pc_NFTsale_Create(:sale_id, :tokenId, :discount_rate)', 
      { replacements: { sale_id: niftInfo.sale_id, tokenId:nftInfo.tokenId , discount_rate:nftInfo.discount_rate } }
     );

     return res.status(201).json({ statusCode: 201, message: 'OK' });

   } catch (error) {

     console.error(error);
     
     if(error.original && (error.original.code === 'ER_BAD_NULL_ERROR' || error.original.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD')) { 
       return res.status(400).json({ statusCode: 400, message:'Bad Request'});
     }
     
     // 기타 서버 에러 처리 
     return res.status(500).json({ statusCode :500 ,message :'Internal Server Error'});
     
   }
});

router.get('/categoryList', async (req, res, next) => {
    const category = "숙박시설";

    try {
        const nftList = await NftToken.findAll({
            include: [{
                model: NftSale,
                where: { category }
            }]
        });
        
        if(!nftList || nftList.length === 0){
            throw new Error("No NFT found");
        }

        res.status(200).json({
            "statusCode" : 200,
            "message" : "OK", 
            "response" : nftList,
        });
      
    } catch(err) {
       next(err); 
    }
});

 


module.exports = router;
