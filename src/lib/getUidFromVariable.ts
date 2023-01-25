export default function getUidFromVariable(name: string): string | undefined {
  return (window as never)[name];
}
