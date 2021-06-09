import { Injectable } from '@nestjs/common';

import { CrudAction } from './crud.action';

import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

import { User } from '../user/user.entity';
import { Photo } from '../photo/photo.entity';

type Subjects = InferSubjects<typeof Photo | typeof User> | 'all';

export type AppAbility = Ability<[CrudAction, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[CrudAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.type === 'admin') {
      can(CrudAction.Manage, 'all'); // read-write access to everything
    } else {
      //can(CrudAction.Read, Photo, { user: user.id, isPublished: true }); // read-only access to everything
    }

    //can(CrudAction.Update, Photo, { user: user.id });
    cannot(CrudAction.Delete, Photo, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
