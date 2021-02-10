const { Kafka } = require('kafkajs');

// create a function
const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092'],
    });

    // create an admin connection first in order to create a topic
    const admin = kafka.admin();
    await admin.connect();
    console.log('Connected to KAFKA');

    // create topic
    await admin.createTopics({
      topics: [
        {
          topic: 'user-created',
          numPartitions: 2,
        },
      ],
    });
    console.log('Topic created successfully');
    await admin.disconnect();
  } catch (err) {
    console.log('Unable to create a topic');
  }
};

run();
