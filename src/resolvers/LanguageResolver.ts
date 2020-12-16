import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateLanguageInput from '../inputs/CreateLanguageInput';
import Language from '../models/Language';

@Resolver()
export default class LanguageResolver {
  @Query(() => [Language])
  languages(): Promise<Language[]> {
    return Language.find();
  }

  @Query(() => Language)
  language(@Arg('id') id: string): Promise<Language | undefined> {
    return Language.findOne(id);
  }

  @Mutation(() => Language)
  async createLanguage(
    @Arg('data') data: CreateLanguageInput
  ): Promise<Language> {
    const language = Language.create(data);
    await language.save();
    return language;
  }

  @Mutation()
  async deleteLanguage(@Arg('id') id: string): Promise<Language[]> {
    const deletedLanguage = Language.findOne(id);
    if (deletedLanguage !== undefined) {
      await Language.remove(deletedLanguage);
    }
    return Language.find();
  }
}
