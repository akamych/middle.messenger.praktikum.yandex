// any используется потому что unknown не назначается
// параметром на объект (например, в метод _changeEvents)
export type formData = Record<string, any> | null;
