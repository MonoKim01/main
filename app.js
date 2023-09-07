const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { sequelize } = require('./models');

const nftstatisticsRouter = require('./routes/nftstatistics');
const nfttokenRouter = require('./routes/nfttoken');
const nftsaleRouter = require('./routes/nftsale');
const nfttransRouter = require('./routes/nfttrans');


dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);
const errorHandler=require('./middleware/errorHandler');


sequelize.sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use('/nftstatistics', nftstatisticsRouter);
app.use('/nfttoken',nfttokenRouter);
app.use('/nftsale',nftsaleRouter);
app.use('/nfttrans',nfttransRouter);

// Error handling middleware should be last after all routes 
app.use(errorHandler);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});