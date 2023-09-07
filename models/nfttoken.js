const Sequelize = require('sequelize');

module.exports = class NFTtoken extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            token_id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            category: {
              type : Sequelize.STRING,
              allowNull : false
          },
        }, {
          sequelize,
          timestamps: false, // 'createdAt' 및 'updatedAt' 필드를 비활성화합니다.
          modelName:'Nfttoken',
          tableName:'nfttokens', // 실제 DB 테이블 이름에 맞게 변경하세요.
        });
    }

    static associate(db) {}
};
