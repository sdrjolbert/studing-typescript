/*
Jogo Pedra, Papel ou Tesoura
Escreva uma função que:

recebe a jogada do jogador ('pedra' | 'papel' | 'tesoura')

gera uma jogada aleatória para o computador

retorna quem ganhou: 'jogador' | 'computador' | 'empate'
*/

import { rl, question } from "./utils/ioHelper";

type Play = "Pedra" | "Papel" | "Tesoura";
type Player = "Player" | "CPU";

const possiblePlays: Play[] = ["Pedra", "Papel", "Tesoura"];

function generateRandomPlay(): Play {
  return possiblePlays[Math.floor(Math.random() * possiblePlays.length)];
}

function verifyWinner(playerPlay: Play, cpuPlayer: Play): string {
  if (playerPlay === cpuPlayer) return "empate!";

  if (playerPlay === "Pedra" && cpuPlayer === "Tesoura") {
    return "vitória do Player!";
  }

  if (playerPlay === "Papel" && cpuPlayer === "Pedra") {
    return "vitória do Player!";
  }

  if (playerPlay === "Tesoura" && cpuPlayer === "Papel") {
    return "vitória do Player!";
  }

  return "vitória da CPU";
}

async function main() {
  while (true) {
    try {
      const choice = await question(
        "Deseja realizar qual jogada?\n\n\t1) Pedra\n\t2) Papel\n\t3) Tesoura\n\t4) Sair\n\nEscolha: "
      );

      const cpuPlay: Play = generateRandomPlay();

      if (choice === "1") {
        const playerPlay: Play = "Pedra";

        const winner: string = verifyWinner(playerPlay, cpuPlay);

        console.log(`\n\nPlayer - ${playerPlay} | ${cpuPlay} - CPU`);
        console.log(`\nPortanto, o jogo terminou em... ${winner}`);
      } else if (choice === "2") {
        const playerPlay: Play = "Papel";

        const winner: string = verifyWinner(playerPlay, cpuPlay);

        console.log(`\n\nPlayer - ${playerPlay} | ${cpuPlay} - CPU`);
        console.log(`\nPortanto, o jogo terminou em... ${winner}`);
      } else if (choice === "3") {
        const playerPlay: Play = "Tesoura";

        const winner: string = verifyWinner(playerPlay, cpuPlay);

        console.log(`\n\nPlayer - ${playerPlay} | ${cpuPlay} - CPU`);
        console.log(`\nPortanto, o jogo terminou em... ${winner}`);
      } else {
        console.log("\n\nVocê escolheu sair!");
        break;
      }

      const tryAgain = await question("\nDeseja jogar novamente? (s/n): ");

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

  rl.close();
}

main();
