/*
Teste de Primos de Mersenne

Escreva um código que receba um valor e verifique
quantos primos de mersenne se encontram até 
aquele determinado valor.

Deve haver uma função para testar a primalidade
Deve haver uma função para verificar o Primo de Mersenne
*/

import { rl, question } from "./utils/ioHelper";

function verifyIfIsPrime(number: bigint): boolean {
  if (number <= 1n) return false;
  if (number === 2n) return true;
  if (number % 2n === 0n) return false;

  for (
    let i = 3n;
    i < BigInt(Math.floor(Math.sqrt(Number(number)))) + 1n;
    i += 2n
  ) {
    if (number % i === 0n) {
      return false;
    }
  }

  return true;
}

function mersenne(n: bigint): bigint {
  return 2n ** n - 1n;
}

function verifyMersennePrime(n: bigint): [boolean, bigint] {
  const mer: bigint = mersenne(n);

  if (verifyIfIsPrime(n) && verifyIfIsPrime(mer)) {
    return [true, mer];
  } else {
    return [false, mer];
  }
}

async function main() {
  const mpl: Array<[bigint, bigint]> = [];

  while (true) {
    try {
      const maxNumberOfIterations: number = Number(
        await question(
          "Digite até que número deseja testar os primos de mersenne: "
        )
      );

      if (isNaN(maxNumberOfIterations) || maxNumberOfIterations < 2) {
        throw new Error(
          "O número digitado tem que ser um valor inteiro não negativo e maior ou igual a 2 (dois)!"
        );
      }

      console.log("\n");

      for (let i = 2n; i <= maxNumberOfIterations; i++) {
        const pm = verifyMersennePrime(i);

        if (pm[0]) {
          mpl.push([i, pm[1]]);
        }

        console.log(
          `Primo ${i}: M_${i} = 2^${i} - 1 = ${pm[1]}, portanto ${
            pm[0] ? "é Primo de Mersenne" : "não é Primo de Mersenne"
          }`
        );
      }

      console.log(
        "\n\nPortanto, os primos de mersenne são os seguintes números:"
      );

      for (const mp of mpl) {
        console.log(`Primo ${mp[0]}: M_${mp[0]} = 2^${mp[0]} - 1 = ${mp[1]}`);
      }

      const tryAgain = await question(
        "\nDeseja testar outros valores? (s/n): "
      );

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

      const tryAgain = await question("\nDeseja tentar novamente? (s/n): ");

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }
    }
  }
}

main();
