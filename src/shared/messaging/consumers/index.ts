// USER

import { CreateUserConsumer } from "../../../modules/users/useCases/createUser/messaging/CreateUserConsumer";

// Método para rodar todos os consumers.
// TODO verificar se existe uma forma nativa de realizar essa função
export function consumers(){
    new CreateUserConsumer().registerUser();
}
