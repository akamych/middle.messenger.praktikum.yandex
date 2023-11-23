// any используется потому что unknown не назначается
// параметром на объект (например, в метод _changeEvents)
export type propType = Record<string, any>;
