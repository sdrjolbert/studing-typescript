/*
Validador de Palíndromo
Escreva uma função que recebe uma string e retorna true se ela for um palíndromo, false caso contrário.

Use tipos para garantir que só recebe string.
*/

import { rl, question } from "./utils/ioHelper";
import { z, ZodError } from "zod";

const StringSchema = z
  .string()
  .regex(
    /^\w\D{1,}$/,
    "O texto de entrada não é válido! Verifique o tamanho ou os caracteres permitidos"
  );

function sanitize(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-zA-Z]/g, "");
}

function verifyPalindrome(input: string): [boolean, string, string] {
  const sanitized = sanitize(input);
  const reversed = sanitized.split("").reverse().join("");
  return [sanitized === reversed, input.split("").reverse().join(""), reversed];
}

async function main() {
  while (true) {
    try {
      const initialInput = await question(
        'Digite a palavra que deseja verificar (somente letras [a-zA-Z], sem números ou caracteres especiais) ou "Q" para sair: '
      );

      if (initialInput.toUpperCase() === "Q") {
        console.log("\n\nVocê escolheu sair!");
        break;
      }

      const inputPalindrome = StringSchema.parse(initialInput);

      const resFromVerify: [boolean, string, string] =
        verifyPalindrome(inputPalindrome);

      const isTheInputPalindrome = resFromVerify[0];
      const palindrome = resFromVerify[1];
      const palindromeWithoutSpace = resFromVerify[2];

      console.log(
        `\nDe acordo com o teste "${inputPalindrome}" ("${inputPalindrome.replace(
          /[^a-zA-Z]/,
          ""
        )}") === "${palindrome}" ("${palindromeWithoutSpace}"): ${isTheInputPalindrome}.\nPortanto "${inputPalindrome}" ("${inputPalindrome.replace(
          /[^a-zA-Z]/,
          ""
        )}") ${isTheInputPalindrome ? "é palíndromo!" : "não é palíndromo!"}`
      );

      const tryAgain = await question(
        "\nDeseja verificar outra palavra? (s/n): "
      );

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }

      console.log("\n");
    } catch (err) {
      console.log("\n\nAVISO!!!");

      if (err instanceof ZodError) {
        console.log("\n\nErro de validação:\n");

        for (const issue of err.issues) {
          console.log(`• ${issue.message}`);
        }
      } else if (err instanceof Error) {
        console.log(`\n\nERROR: ${err.message}`);
      } else {
        console.log(`\n\nERROR: ${err}`);
      }

      const tryAgain = await question("\nDeseja tentar novamente? (s/n): ");

      console.log("\n");

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }
    }
  }

  rl.close();
}

main();
