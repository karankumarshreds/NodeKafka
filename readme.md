# kafka with nodejs

## zookeeper

```
docker run --name zookeeper -p 2181:2181 zookeeper
```

## kafka

Kafka out of the box needs zookeeper to be running even if you are running a single instance of kafka.

`KAFKA_ADVERTISED_LISTENERS` defines how the kafka instance is exposed for the consumers.

`KAFKA_OFFSET_TOPIC_REPLICATION_FACTOR` we explicitly tells kafka that we are using only a single instance.

```
docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSET_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```
