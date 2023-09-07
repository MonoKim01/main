const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = class NFTsale extends Model {

  static init(sequelize) {
    return super.init({
      sale_id:{
        type :Sequelize.STRING,
        allowNull:false ,
        primaryKey:true ,
      }, 
      token_id:{
         type :Sequelize.STRING ,
         references:{
             model:'Nfttokens',
             key:'token_id'
         }
     },
     price: {
       type: Sequelize.INTEGER,
       allowNull: false
     },
     discount_rate:{
         type :Sequelize.FLOAT , // 할인율이므로 FLOAT 타입이 더 적절할 것 같습니다.
         allowNull:true , 
     },
     finalPrice: {
       // 이 필드는 데이터베이스에 실제로 저장되지 않으며, afterFind hook에서만 사용됩니다.
       // 따라서 실제 데이터베이스 테이블에는 이 필드가 없어야 합니다.
       type: Sequelize.VIRTUAL,
       get() {
           return this.getDataValue('price') - this.getDataValue('price') * this.getDataValue('discount_rate');
       }
     }
   }, { 
       sequelize, 
       modelName:'Nftsale',
       tableName:'nftsales', // 실제 DB 테이블 이름에 맞게 변경하세요.
       timestamps:false
   });
  }

  static associate(db) {
      db.NFTsale.belongsTo(db.NFTtoken, { foreignKey: 'token_id', targetKey: 'token_id' });
  }
};
