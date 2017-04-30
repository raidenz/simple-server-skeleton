var faker = require('faker');
var exports = module.exports = {};

exports.fakeCategory = () => {
  return {
    name: faker.lorem.words(1),
  }
}

exports.fakeTag = () => {
  return {
    name: faker.lorem.words(1),
  }
}

exports.fakeUser = () => {
  const name = faker.internet.userName();
  return {
    name: name,
    email: name.toLowerCase()+'@example.com', // email base on name
  }
}

exports.fakePost = () => {
  let title = faker.lorem.words();
  return {
    user_id : faker.helpers.randomize(Array.from({length: 5}, (v, k) => k+1)),
    category_id: faker.helpers.randomize(Array.from({length: 5}, (v, k) => k+1)),
    title: title,
    html: "<p> " + faker.lorem.sentence(20) + " </p>",
  }

}
