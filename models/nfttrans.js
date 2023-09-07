const Sequelize = require('sequelize');

module.exports = class NFTtrans extends Sequelize.Model {

  static init(sequelize) {

    return super.init({
       from_address:{
            type :Sequelize.STRING ,
            primaryKey:true , 
            allowNull:false
       },  
       
       to_address:{
            type :Sequelize.STRING ,
            allowNull:false
       },  
       
       contractAddress:{
           type :Sequelize.STRING ,
           allowNull:false
        }
    },{
         sequelize, 
         modelName:'Nfttrans',
         tableName:'nfttrans', // 실제 DB 테이블 이름에 맞게 변경하세요.
         timestamps:false
    });

  }

  static associate(db) {}
};
