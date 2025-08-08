/*
Contador
Implemente uma classe Contador com:

método para incrementar

método para decrementar

método para resetar

método para obter o valor atual

o valor inicial começa em 0
*/

import { rl, question } from "./utils/ioHelper";

class Counter {
  private _actualValue: number;

  constructor(initialValue: number = 0) {
    this._actualValue = initialValue;
  }

  set actualValue(n: number) {
    this._actualValue = n;
  }

  get actualValue(): number {
    return this._actualValue;
  }

  increaseValue(n: number = 1) {
    this._actualValue += n;
  }

  decreaseValue(n: number = 1) {
    this._actualValue -= n;
  }

  resetValue() {
    this._actualValue = 0;
  }
}

async function main() {
  while (true) {
    try {
      const numberChoice: string = await question(
        "Deseja começar o contador com um valor específico ou começar do zero?\n\n\t1) Zero\n\t2) Valor Específico\n\t3) Sair\n\nEscolha: "
      );

      if (numberChoice === "3") {
        console.log("\n\nVocê escolheu sair!");
        break;
      }

      const counter: Counter =
        numberChoice === "1"
          ? new Counter()
          : new Counter(
              Number(
                await question(
                  "\nDigite o valor número de início que deseja para realizar as contas: "
                )
              )
            );

      while (true) {
        try {
          const choice = await question(
            "\n\nO que deseja fazer?\n\n\t1) Incrementar em N o valor do contador\n\t2) Subtrair um valor N do contador\n\t3) Resetar o contador (voltar a 0)\n\t4) Mostar o valor atual do contador\n\t5)Sair\n\nEscolha: "
          );

          if (choice === "1") {
            const valueToIncrease = Number(
              await question("\nDigite o valor que deseja incrementar: ")
            );

            console.log(
              `Valor atual: ${counter.actualValue}, valor a ser incrementado: +${valueToIncrease}`
            );

            counter.increaseValue(valueToIncrease);

            console.log(`\nValor atualizado: ${counter.actualValue}`);
          } else if (choice === "2") {
            const valueToDecrease = Number(
              await question("\nDigite o valor que deseja subtrair: ")
            );

            console.log(
              `Valor atual: ${counter.actualValue}, valor a ser subtraído: -${valueToDecrease}`
            );

            counter.decreaseValue(valueToDecrease);

            console.log(`\nValor atualizado: ${counter.actualValue}`);
          } else if (choice === "3") {
            console.log(`Valor atual: ${counter.actualValue}`);
            counter.resetValue();
            console.log(`\nValor atualizado: ${counter.actualValue}`);
          } else if (choice === "4") {
            console.log(`\nValor atual: ${counter.actualValue}`);
          } else {
            console.log("\n\nVocê escolheu sair!");
            break;
          }

          const tryAgain = await question(
            "\nDeseja realizar outra ação? (s/n): "
          );

          if (tryAgain.trim().toLowerCase() !== "s") {
            break;
          }

          console.log("\n");
        } catch (err) {
          console.log("\n\nAVISO!!!");

          err instanceof Error
            ? console.log(`\n\nERROR: ${err.message}`)
            : console.log(`\n\nERROR: ${err}`);

          const tryAgain = await question(
            "\n\nDeseja tentar novamente? (s/n): "
          );

          if (tryAgain.trim().toLowerCase() !== "s") {
            console.log("\n\nAté a próxima!!!");
            break;
          }
        }
      }
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
