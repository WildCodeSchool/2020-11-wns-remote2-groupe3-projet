import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import LanguageInput from '../inputs/LanguageInput';
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
  async createLanguage(@Arg('data') data: LanguageInput): Promise<Language> {
    const language = Language.create(data);
    await language.save();
    return language;
  }

  @Mutation(() => [Language])
  async deleteLanguage(@Arg('id') id: string): Promise<Language[]> {
    const deletedLanguage = await Language.findOne(id);
    if (deletedLanguage !== undefined) {
      await Language.remove(deletedLanguage);
      return Language.find();
    }
    throw new Error('Language not found');
  }
}
