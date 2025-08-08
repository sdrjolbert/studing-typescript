import ReadLine from "node:readline";

export const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function question(text: string): Promise<string> {
  return new Promise((res) => rl.question(text, res));
}
