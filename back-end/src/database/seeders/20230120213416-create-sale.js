module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [ 
        {
          id: 1,
          user_Id: 3,
          seller_Id: 2,
          total_price: 10.00,
          delivery_address: 'Rua dos bobos',
          delivery_number: '369',
          sale_date: '1994-06-21',
          status: 'Entregue'
        },
        {
          id: 2,
          user_Id: 3,
          seller_Id: 2,
          total_price: 30.00,
          delivery_address: 'Rua das bobos',
          delivery_number: '369',
          sale_date: '2023-01-26',
          status: 'Pendente'
        },
        {
          id: 3,
          user_Id: 4,
          seller_Id: 2,
          total_price: 200.00,
          delivery_address: 'Rua das bobas',
          delivery_number: '777',
          sale_date: '2023-01-25',
          status: 'Em Trânsito'
        },
        {
          id: 4,
          user_Id: 4,
          seller_Id: 2,
          total_price: 220.00,
          delivery_address: 'Rua das bobas',
          delivery_number: '777',
          sale_date: '2023-01-25',
          status: 'Preparando'
        },
        {
          id: 5,
          user_Id: 3,
          seller_Id: 5,
          total_price: 355.00,
          delivery_address: 'Rua sem nome',
          delivery_number: '555',
          sale_date: '2020-01-21',
          status: 'Preparando'
        },
        {
          id: 6,
          user_Id: 4,
          seller_Id: 5,
          total_price: 645.00,
          delivery_address: 'Rua do mercadante',
          delivery_number: '444',
          sale_date: '2015-02-23',
          status: 'Em trânsito'
        }
      ], { timestamps: false });
  },
  
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
