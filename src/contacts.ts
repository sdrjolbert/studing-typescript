/*
Agenda de Contatos
Crie um tipo Contato com nome, email, telefone.

Crie um array de contatos.

Implemente funções para:

adicionar um contato

remover um contato pelo email

listar os contatos
*/

import { rl, question } from "./utils/ioHelper";
import { z, ZodError } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Nome não pode ser vazio!"),
  email: z.email("Email inválido!"),
  phoneNumber: z.string().regex(/^\d{8,13}$/, "Telefone inválido!"),
});

type Contact = z.infer<typeof ContactSchema>;

const contactList: Contact[] = [];

function createContact(contact: Contact): void {
  contactList.push(contact);
}

function searchContact(email: string, contactList: Array<Contact>): Contact {
  for (const contact of contactList) {
    if (contact.email === email) {
      return contact;
    }
  }

  throw new Error("Não existe um contato com esse email!");
}

function removeContact(email: string, contactList: Array<Contact>): void {
  const contact: Contact = searchContact(email, contactList);

  const i = contactList.indexOf(contact);

  if (i > -1) {
    contactList.splice(i, 1);
  } else {
    throw new Error("Contato não encontrado!");
  }
}

function showContacts(contactList: Array<Contact>): void {
  console.log("\nContatos atuais:\n\n");
  for (const contact of contactList) {
    console.log(contact);
  }
}

async function main() {
  while (true) {
    try {
      const choice = await question(
        "Você deseja realizar qual ação?\n\n\t1) Criar um contato\n\t2) Remover um contato\n\t3) Mostar os contatos atuais\n\t4) Sair\n\nEscolha: "
      );

      if (choice === "1") {
        const name = await question("\nDigite o nome do contato: ");
        const email = await question("Digite o email do contato: ");
        const phoneNumber = await question(
          "Digite o número de telefone do contato: "
        );

        const contato = ContactSchema.parse({ name, email, phoneNumber });
        createContact(contato);
        console.log("\nContato criado com sucesso!");
      } else if (choice === "2") {
        if (contactList.length === 0) {
          console.log("\nVocê ainda não tem contatos!\n");
          continue;
        }

        const email = await question("\nDigite o email do contato: ");
        removeContact(email, contactList);
        console.log("\nContato removido com sucesso!");
      } else if (choice === "3") {
        if (contactList.length === 0) {
          console.log("\nVocê ainda não tem contatos!\n");
          continue;
        }

        showContacts(contactList);
        console.log("\n-- FIM DA LISTA DE CONTATOS --");
      } else {
        console.log("\n\nVocê escolheu sair!");
        break;
      }

      const tryAgain = await question("\nDeseja realizar outra ação? (s/n): ");

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

      if (tryAgain.trim().toLowerCase() !== "s") {
        console.log("\n\nAté a próxima!!!");
        break;
      }
    }
  }

  rl.close();
}

main();
