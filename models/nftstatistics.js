const Sequelize = require('sequelize');
const Model = Sequelize.Model;

module.exports = class NFStatistics extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            make_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            make_YY: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            make_MM:{
                type: Sequelize.INTEGER,
                allowNull:false
            },
            make_DD:{
                type: Sequelize.INTEGER,
                allowNull:false
            },
            make_HH:{
                type: Sequelize.INTEGER ,
                allowNull:false
            },
            product_name:{
              type : Sequelize.STRING(255),
              allowNull : true
          }
        }, {
          sequelize,
          timestamps: false, // 'createdAt' 및 'updatedAt' 필드를 비활성화합니다.
          modelName:'Nftstatistics',
          tableName:'nftstatistics', // 실제 DB 테이블 이름에 맞게 변경하세요.
        });
    }

    static associate(db) {}
};
