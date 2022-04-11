'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('recruitment_content', [{
      user_id: 1,
      address: '서울특별시 서초구 서초대로 397',
      category_food: 1, 
      delivery_fee: 1000,
      recruitment_personnel: 2,
      created_at: new Date(),
      restaurant_name: 'nene',
      body: 'come and join with me!',
      lat: 37.49654,
      lng: 127.02476,
      closed: 1
    }, {
      user_id: 2,
      address: '서울특별시 서초구 서초대로74길 4',
      category_food: 3,
      delivery_fee: 3000,
      recruitment_personnel: 3,
      created_at: new Date(),
      restaurant_name: '도미노피자',
      body: 'i like pizza',
      lat: 37.49672,
      lng: 127.02571,
      closed: 1
    }, {
      user_id: 2,
      address: '서울특별시 서초구 서초대로74길 4',
      category_food: 7,
      delivery_fee: 1500,
      recruitment_personnel: 1,
      created_at: new Date(),
      restaurant_name: '신전떡볶이',
      body: 'i like ttokbbokki',
      lat: 37.49672,
      lng: 127.02571,
      closed: 2
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('recruitment_content', null, {});

  }
};
