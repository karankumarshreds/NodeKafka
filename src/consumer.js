const { Kafka } = require('kafkajs');

const run = async () => {
  try {
    // create client
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092'],
    });

    // connect as consumer
    const consumer = await kafka.consumer({
      // all the consumers will be of the same group
      groupId: 'consumer1',
    });
    await consumer.connect();
    console.log('Connected to KAFKA');

    // consume topic
    await consumer.subscribe({
      topic: 'user-created',
      fromBeginning: true,
    });

    // console log the received data
    await consumer.run({
      eachMessage: async (payload) => {
        console.log(`Recieved data ${payload.message.value}`);
      },
    });
  } catch (error) {
    console.log('Unable to subscribe to topic');
  }
};

run();
