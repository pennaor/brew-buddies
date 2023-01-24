const { Product } = require('../database/models');


const getAllProducts = async () => {
    return Product.findAll();
}

module.exports = { getAllProducts };