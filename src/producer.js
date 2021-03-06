const { Kafka } = require('kafkajs');

const run = async (data = 'Karan') => {
  try {
    // configure client
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092'],
    });

    // create a producer and connect
    const producer = kafka.producer();
    await producer.connect();

    // decide the partition
    // A-M 0, N-Z 1
    const partition = data[0] < 'N' ? 0 : 1;

    // publish to a topic
    await producer.send({
      topic: 'user-created',
      messages: [
        {
          value: data,
          partition,
        },
      ],
    });
    console.log('Message published', data);
    await producer.disconnect();
  } catch (err) {
    console.log('Unable to send message', err);
  } finally {
    process.exit(0);
  }
};

run();
