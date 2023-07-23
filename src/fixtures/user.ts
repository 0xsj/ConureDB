import { User } from '../models';
import { LoremIpsum } from 'lorem-ipsum';
import { faker } from '@faker-js/faker';
import shortid from 'shortid';

const DATA: Array<User> = [];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

for (let i = 0; i < 10; ++i) {
  DATA.push({
    id: shortid.generate(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: lorem.generateWords(),
    profileImage: faker.image.url()
  });
}

export default DATA;
