import { InputType, Field } from 'type-graphql';
import Message from '../models/Message';

@InputType()
export class CreateMessageInput implements Partial<Message> {
  @Field()
  content!: string;

  @Field(() => String)
  senderId!: string;

  @Field(() => String)
  receiverId!: string;
}

@InputType()
export class ConversationInput {
  @Field()
  senderId!: string;

  @Field()
  receiverId!: string;
}
