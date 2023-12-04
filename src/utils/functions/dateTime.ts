export function getMessageDate(input: string) : string {
  const date = new Date(input);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

export function getMessageTime(input: string) : string {
  const date = new Date(input);
  let minutes = date.getMinutes();
  if (minutes < 10) { minutes = `0${minutes}`; }
  return `${date.getHours()}:${minutes}`;
}
