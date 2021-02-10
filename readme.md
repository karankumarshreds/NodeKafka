# kafka with nodejs

## zookeeper

```
docker run --name zookeeper -p 2181:2181 zookeeper
```

## kafka

Kafka out of the box needs zookeeper to be running even if you are running a single instance of kafka.

`KAFKA_ADVERTISED_LISTENERS` defines how the kafka instance is exposed for the consumers.

`KAFKA_OFFSET_TOPIC_REPLICATION_FACTOR` we explicitly tells kafka that we are using only a single instance.

Fetch ZOOKEEPERS IP (lets NOT assume that it is running on the 127.0.0.1)

```
docker inspect zookeeper --format='{{ .NetworkSettings.IPAddress }}'
```

Use the output in the following command

```sh
docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=<zookeeper_ip>:2181 \
 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 \
 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka
```

or more dynamic

```
$ Zookeeper_Server_IP=$(docker inspect zookeeper --format='{{ .NetworkSettings.IPAddress }}')

$ docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=${Zookeeper_Server_IP}:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka
```
