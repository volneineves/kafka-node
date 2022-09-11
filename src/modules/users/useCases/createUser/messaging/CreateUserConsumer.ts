import { Users } from "@prisma/client";
import { deserializer } from "../../../serial";
import { container } from "tsyringe";
import { CreateUserService } from "../service/CreateUserService";
import kafka from "../../../../../shared/messaging/kafka";

class CreateUserConsumer {
  async registerUser() {
    const createUserService = container.resolve(CreateUserService);

    const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! });
    await consumer.connect();
    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC_REGISTER_USER!,
      fromBeginning: true,
    });

    try {
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value;
          if (value) {
            const user: Users = deserializer(value);
            createUserService.executeRepository(user); // É possível utilizar o repository ao invés do service
            console.log("The registerUser topic has just been saved in database");
          } else {
            console.log("There was an error receiving the topic registerUser");
          }
        },
      });
    } catch (err) {
      console.log("There was an error receiving the topic registerUser");
    }
  }
}

export { CreateUserConsumer };
