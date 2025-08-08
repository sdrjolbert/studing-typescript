/*
Gerador de Números Ímpares
Escreva uma função que:

recebe um número N

retorna um array com os N primeiros números ímpares
*/

import { rl, question } from "./utils/ioHelper";

function generateFirstNOddNumbers(n: number): Array<number> {
  return Array.from({ length: n }, (_, i) => 2 * i + 1);
}

function verifyIfIsNumber(n: number): number {
  if (
    n === undefined ||
    n === null ||
    isNaN(n) ||
    typeof n !== "number" ||
    n < 1
  ) {
    throw new Error(
      "N tem que ser um valor númerico positivo maior que 0 (zero)!"
    );
  }

  return n;
}

async function main() {
  while (true) {
    try {
      const input: number = Number(
        await question("Digite um número para saber os N primeiros ímpares: ")
      );

      const n = verifyIfIsNumber(input);

      const oddNumbers: Array<number> = generateFirstNOddNumbers(n);

      console.log(
        `\n\nAbaixo estão os ${n} primeiros ímpares:\n\n${oddNumbers}`
      );

      const tryAgain = await question("\nDeseja testar outro número? (s/n): ");

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }

      console.log("\n");
    } catch (err) {
      console.log("\n\nAVISO!!!");

      err instanceof Error
        ? console.log(`\n\nERROR: ${err.message}`)
        : console.log(`\n\nERROR: ${err}`);

      const tryAgain = await question("\n\nDeseja tentar novamente? (s/n): ");

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }
    }
  }

  rl.close();
}

main();
