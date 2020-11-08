import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly owner?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class Profile {
  readonly id: string;
  readonly age: number;
  readonly gender: string;
  readonly height: number;
  readonly owner?: string;
  constructor(init: ModelInit<Profile>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile>) => MutableModel<Profile> | void): Profile;
}