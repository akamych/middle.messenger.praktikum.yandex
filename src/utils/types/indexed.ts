export type Indexed<T = any> = {
    // eslint-disable-next-line no-unused-vars
    [key in string]: T;
};
