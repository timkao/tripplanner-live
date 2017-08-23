const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const Hotel = conn.define('hotel', {
  name: Sequelize.STRING
});

const Restaurant = conn.define('restaurant', {
  name: Sequelize.STRING
});

const Activity = conn.define('activity', {
  name: Sequelize.STRING
});

const Place = conn.define('place', {
  location: Sequelize.ARRAY(Sequelize.FLOAT)
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = ()=> {
  var data = require('./seed.js');
  const { hotels, restaurants, activities } = data;
  const options = {
    include: [ Place ]
  };
  return Promise.all([
    Promise.all(hotels.map( item => Hotel.create(item, options))),
    Promise.all(restaurants.map( item => Restaurant.create(item, options))),
    Promise.all(activities.map( item => Activity.create(item, options)))
  ])
  .then( ([ hotels, restaurants, activities ])=> {
    return {
      hotels,
      restaurants,
      activities
    };
  }); 
};

module.exports = {
  sync,
  seed,
  models: {
    Hotel,
    Restaurant,
    Activity,
    Place
  }
};
