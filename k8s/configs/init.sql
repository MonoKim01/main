CREATE DATABASE nfticon

GRANT ALL PRIVILEGES ON *.* TO ‘root’@‘localhost’;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS nfttokens (
  token_id VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY (token_id)
);
CREATE TABLE IF NOT EXISTS nftsales (
  sale_id VARCHAR(255) NOT NULL,
  token_id VARCHAR(255),
  price INTEGER NOT NULL,
  discount_rate FLOAT,
  PRIMARY KEY (sale_id),
  FOREIGN KEY (token_id) REFERENCES nfttokens(token_id) ON DELETE NO ACTION ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS nfttrans (
   from_address VARCHAR(255) NOT NULL,
   to_address VARCHAR(255) NOT NULL,
   contractAddress VARCHAR(255)NOT NULL,
   PRIMARY KEY(from_address)
);
CREATE TABLE IF NOT EXISTS nftstatistics (
    make_date DATE NOT NULL,
    make_YY INTEGER NOT NULL,
    make_MM INTEGER NOT NULL,
    make_DD INTEGER not null ,
    make_HH INTEGER not null ,
    product_name varchar (225)
);
DELIMITER //
CREATE PROCEDURE pc_NFTsale_Create(IN p_sale_id VARCHAR(255), IN p_token_id VARCHAR(255), IN p_price INT, IN p_discount_rate FLOAT)
BEGIN
INSERT INTO nftsales(sale_id, token_id, price, discount_rate)
VALUES(p_sale_id, p_token_id, p_price, p_discount_rate);
END//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE pc_NFTtoken_Create(IN p_token_id VARCHAR(255), IN p_price INT, IN p_category VARCHAR(255))
BEGIN
INSERT INTO nfttokens(token_id, price, category)
VALUES(p_token_id, p_price, p_category);
END//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE pc_NFStatistics_Create(IN p_make_date DATE, IN p_make_YY INT, IN p_make_MM INT,
                                        IN p_make_DD INT, IN p_make_HH INT,
                                        IN product_name VARCHAR(225))
BEGIN
INSERT INTO nftstatistics(make_date, make_YY ,make_MM ,make_DD ,make_HH ,product_name)
VALUES(p_make_date,p_make_YY,p_make_MM,p_make_DD,p_make_HH ,product_name);
END//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE pc_NFTtrans_Create(IN from_address VARCHAR(255),
                                    IN to_address VARCHAR(255),
                                    IN contractAddress VARCHAR(255))
BEGIN
INSERT INTO nfttrans(from_address,to_address ,contractAddress)
VALUES(from_address,to_address ,contractAddress);
END//
DELIMITER ;