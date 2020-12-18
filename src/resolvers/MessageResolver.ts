// import { Arg, Query, Resolver } from 'type-graphql';
// import { ConversationInput } from '../inputs/MessageInput';
// import Message from '../models/Message';

// @Resolver()
// export default class MessageResolver {
//   @Query(() => [Message])
//   allMessages(@Arg('data') data: ConversationInput): Promise<Message[]> {
//     return Message.find({
//       where: [
//         { sender_id: data.sender, receiver_id: data.receiver },
//         { sender_id: data.receiver, receiver_id: data.sender },
//       ],
//     });
//   }
// }
