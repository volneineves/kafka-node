import { Users } from "@prisma/client";
import avro from "avsc";

function serialUser() {
  return avro.Type.forSchema({
    type: "record",
    name: "User",
    fields: [
      {
        name: "id",
        type: "string",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "email",
        type: "string",
      },
    ],
  });
}

function serializer(user: Users): Buffer {
  return serialUser().toBuffer(user);
}

function deserializer(value: Buffer): Users {
  return serialUser().fromBuffer(value);
}

export { serializer, deserializer };
