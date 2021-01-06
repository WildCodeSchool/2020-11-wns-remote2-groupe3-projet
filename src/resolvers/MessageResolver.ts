import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ConversationInput, CreateMessageInput } from '../inputs/MessageInput';
import Message from '../models/Message';
import User from '../models/User';

@Resolver()
export default class MessageResolver {
  @Query(() => [Message])
  allMessages(@Arg('data') data: ConversationInput): Promise<Message[]> {
    return Message.find({
      where: [
        { sender_id: data.senderId, receiver_id: data.receiverId },
        { sender_id: data.receiverId, receiver_id: data.senderId },
      ],
    });
  }

  @Mutation(() => Message)
  async createMessage(@Arg('data') data: CreateMessageInput): Promise<Message> {
    const sender = await User.findOne({ where: { id: data.senderId } });
    const receiver = await User.findOne({ where: { id: data.receiverId } });
    const message = Message.create();
    if (sender && receiver) {
      message.sender = sender;
      message.receiver = receiver;
      message.content = data.content;
      await message.save();
      return message;
    }
    throw new Error('Sender or Receiver unknown.');
  }

  @Mutation(() => Message)
  async deleteMessage(@Arg('id') id: string): Promise<Message> {
    const deletedMessage = await Message.findOne(id);
    if (deletedMessage) {
      await Message.remove(deletedMessage);
      return deletedMessage;
    }
    throw new Error('Message not found.');
  }
}
