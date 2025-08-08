/*
Conversor de Temperatura
Escreva uma função converterTemperatura que receba:

um número (valor)

uma string literal: "C" | "F" | "K" (de qual unidade)

uma string literal: "C" | "F" | "K" (para qual unidade)

Retorne a temperatura convertida.

Exemplo: converterTemperatura(0, 'C', 'F') // 32
*/

import { rl, question } from "./utils/ioHelper";

type TemperatureScales = "C" | "F" | "K";

function verifyScale(value: string): TemperatureScales {
  value = value.toUpperCase();

  if (value === "C" || value === "F" || value === "K") {
    return value;
  } else {
    throw new Error(
      "A escala digitada é inválida ou foi digitada erroneamente!"
    );
  }
}

function temperatureConveter(
  temperature: number,
  startScale: TemperatureScales,
  convertedScale: TemperatureScales
): number {
  if (startScale === convertedScale) return temperature;

  switch (`${startScale}->${convertedScale}`) {
    case "C->F":
      return temperature * (9 / 5) + 32;
    case "C->K":
      return temperature + 273.15;
    case "F->C":
      return (temperature - 32) * (5 / 9);
    case "F->K":
      return (temperature + 459.67) * (5 / 9);
    case "K->C":
      return temperature - 273.15;
    case "K->F":
      return temperature * (9 / 5) - 459.67;
    default:
      throw new Error(
        "Não foi possível converter, por favor, tente novamente!"
      );
  }
}

async function main() {
  while (true) {
    try {
      const temperature = Number(
        (
          await question(
            "Digite o valor da temperatura atual a ser convertida: "
          )
        ).trim()
      );

      if (isNaN(temperature)) {
        console.log("\nTemperatura inválida!");
        continue;
      }

      const startScaleInput = await question(
        'Digite a escala original da temperatura (C/F/K) ou "Q" para sair: '
      );

      if (startScaleInput.toUpperCase() === "Q") {
        console.log("\n\nVocê escolheu sair!");
        break;
      }
      const startScale = verifyScale(startScaleInput);

      const convertedScaleInput = await question(
        'Digite a escala para qual a temperatura será convertida (C/F/K) ou "Q" para sair: '
      );

      if (convertedScaleInput.toUpperCase() === "Q") {
        console.log("\n\nVocê escolheu sair!");
        break;
      }
      const convertedScale = verifyScale(convertedScaleInput);

      const convertedTemperature = temperatureConveter(
        temperature,
        startScale,
        convertedScale
      ).toFixed(2);

      console.log(
        `\nA temperatura ${temperature.toFixed(
          2
        )} ${startScale} convertida para ${convertedScale} fica em ${convertedTemperature}, portanto ${temperature.toFixed(
          2
        )} ${startScale} == ${convertedTemperature} ${convertedScale}.`
      );

      const tryAgain = await question(
        "\nDeseja converter outra temperatura? (s/n): "
      );

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }

      console.log("\n");
    } catch (err: any) {
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
