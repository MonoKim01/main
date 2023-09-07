const Sequelize = require('sequelize');
const NFTtoken = require('./nfttoken');
const NFTsale = require('./nftsale');
const NFTtrans = require('./nfttrans');
const NFStatistics = require('./nftstatistics');

    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config')[env];
    const db = {};

    const sequelize = new Sequelize(
        config.database, config.username, config.password, config
    );

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

db.NFTtoken=NFTtoken;
db.NFTsale=NFTsale;
db.NFTtrans=NFTtrans;
db.NFStatistics=NFStatistics;

NFTtoken.init(sequelize);
NFTsale.init(sequelize);
NFTtrans.init(sequelize);
NFStatistics.init(sequelize);

NFTtoken.associate(db);
NFTsale.associate(db);

module.exports=db;
