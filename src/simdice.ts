/*
Simulador de Dados
Crie uma função rolarDado que simula um dado de 6 lados e retorna um número entre 1 e 6.

Crie uma função rolarD20 que simula um dado de 20 lados.

Use Math.random e literal types para identificar o tipo do dado rolado.
*/

import { rl, question } from "./utils/ioHelper";

type Dice = 6 | 20;

function rollDice(dice: Dice): number {
  return Math.floor(Math.random() * dice) + 1;
}

async function delay(text: string, time: number): Promise<void> {
  return new Promise((res) =>
    setTimeout(() => {
      console.log(text);
      res();
    }, time)
  );
}

async function main() {
  while (true) {
    try {
      const choice = await question(
        "Você deseja realizar qual ação?\n\n\t1) Rolar dado de 6 lados\n\t2) Rolar dado de 20 lados\n\t3) Rolar dado aleatório\n\t4) Rolar ambos\n\t5) Sair\n\nEscolha: "
      );

      if (choice === "1") {
        console.log("\nRolando dado de 6 lados...");
        await delay(`\nNúmero escolhido pelo dado: ${rollDice(6)}`, 3000);
      } else if (choice === "2") {
        console.log("\nRolando dado de 20 lados...");
        await delay(`\nNúmero escolhido pelo dado: ${rollDice(20)}`, 3000);
      } else if (choice === "3") {
        console.log("\nEscolhendo dado aleatório...");

        let chosenDice: Dice = Math.random() < 0.5 ? 6 : 20;
        await delay(
          `\nO dado escolhido foi o dado de ${chosenDice} lados!`,
          5000
        );

        console.log(`\nRolando o dado de ${chosenDice} lados...`);
        await delay(
          `\nNúmero escolhido pelo dado: ${rollDice(chosenDice)}`,
          3000
        );
      } else if (choice === "4") {
        console.log("\nRolando ambos os dados...");
        await delay(
          `\nNúmero escolhido pelo dados: ${rollDice(6) + rollDice(20)}`,
          3000
        );
      } else {
        console.log("\n\nVocê escolheu sair!");
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

  rl.close();
}

main();
