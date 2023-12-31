declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.hbs' {
    const content: string;
    export default content;
}

declare module '*.json' {
    const content: string;
    export default content;
}
