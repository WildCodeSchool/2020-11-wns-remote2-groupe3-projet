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
        { sender: data.senderId, receiver: data.receiverId },
        { sender: data.receiverId, receiver: data.senderId },
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

  @Mutation(() => String)
  async deleteMessage(@Arg('id') id: string): Promise<string> {
    const deletedMessage = await Message.findOne(id);
    if (deletedMessage) {
      await Message.remove(deletedMessage);
      return 'Message deleted with success.';
    }
    throw new Error('Message not found.');
  }
}
