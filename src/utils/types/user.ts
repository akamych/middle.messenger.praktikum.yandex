import Block from '../../classes/Block.ts';

export type UserType = {
    id: Number,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    avatar: string | null,
    email: string,
    inActiveChat?: boolean,
    buttons?: Block[],
    events?: Record<string, Function>,
  };
