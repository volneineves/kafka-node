import { Users } from "@prisma/client";
import kafka from "../../../../../shared/messaging/kafka";
import { serializer } from "../../../serial";

export class CreateUserProducer {
  async registerUser(user: Users) {
    try {
      const producer = kafka.producer();
      await producer.connect();
  
        await producer.send({
          topic: process.env.KAFKA_TOPIC_REGISTER_USER!,
          messages: [{ key: user.id, value: serializer(user) }],
        });
        console.log("The registerUser topic has just been sent");
      await producer.disconnect();
    } catch(err) {
      console.log("There was an error submitting the topic registerUser");
    }
  }
}