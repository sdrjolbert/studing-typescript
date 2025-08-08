/*
Catálogo de Produtos
Crie uma interface Produto com id, nome, preço e categoria.

Crie um array com pelo menos 5 produtos.

Implemente funções para:

listar produtos por categoria

calcular o preço total de todos os produtos

aplicar um desconto de X% em todos os produtos
*/

import { rl, question } from "./utils/ioHelper";
import { z, ZodError } from "zod";

const ProductsSchema = z.object({
  id: z.int().min(1).nonnegative("O id não pode ser nulo ou negativo!"),
  name: z
    .string()
    .nonempty("O nome não pode ser nulo e deve ser um valor alfabetico!!")
    .regex(
      /[a-zA-Z\s]{1,}$/,
      "O nome não pode ser nulo e deve ser um valor alfabetico!!"
    ),
  quantity: z
    .number()
    .min(1)
    .nonnegative(
      "A quantidade deve ser um valor númerico não nulo e não negativo!"
    ),
  price: z
    .number()
    .min(1)
    .nonnegative("O preço não pode ser nulo ou negativo!"),
  category: z
    .string()
    .nonempty()
    .regex(
      /[a-zA-Z\s]{1,}$/,
      "O produto deve ter uma categoria e deve ser um valor alfabetico!"
    ),
});

type Product = z.infer<typeof ProductsSchema>;

const productsList: Product[] = [];

const product1 = {
  id: 1,
  name: "alvejante",
  quantity: 9,
  price: 22.5,
  category: "limpeza",
};

const product2 = {
  id: 2,
  name: "hamburguer",
  quantity: 24,
  price: 1.55,
  category: "congelados",
};

const product3 = {
  id: 3,
  name: "shampoo",
  quantity: 7,
  price: 12.0,
  category: "higiene",
};

const product4 = {
  id: 4,
  name: "refrigerante",
  quantity: 32,
  price: 6.9,
  category: "bebidas",
};

const product5 = {
  id: 5,
  name: "presunto",
  quantity: 10,
  price: 28.99,
  category: "frios",
};

productsList.push(ProductsSchema.parse(product1));
productsList.push(ProductsSchema.parse(product2));
productsList.push(ProductsSchema.parse(product3));
productsList.push(ProductsSchema.parse(product4));
productsList.push(ProductsSchema.parse(product5));

function sanitize(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function verifyRepeatedProducts(
  product: Product,
  products: Array<Product>
): boolean {
  let productControllerId = false;
  let productControllerName = false;

  for (const product_ of products) {
    if (product_.id === product.id) productControllerId = true;
    if (sanitize(product_.name) === sanitize(product.name))
      productControllerName = true;
  }

  if (product && productControllerId) {
    throw new Error("Já existe um produto cadastrado com esse id!");
  } else if (product && productControllerName) {
    throw new Error("Já existe um produto cadastrado com esse nome!");
  } else if (product && productControllerId && productControllerName) {
    throw new Error("Esse produto já está cadastrado!");
  }

  return false;
}

function createProduct(
  id: number,
  name: string,
  quantity: number,
  price: number,
  category: string
): Product {
  const product = ProductsSchema.parse({
    id,
    name: sanitize(name),
    quantity,
    price,
    category: sanitize(category),
  });

  const isProductRepeated = verifyRepeatedProducts(product, productsList);

  if (product && !isProductRepeated) {
    productsList.push(product);
    return product;
  } else {
    throw new Error("Não foi possível cadastrar um novo produto!");
  }
}

function salesDiscountPromotion(
  products: Array<Product>,
  discount: number
): void {
  products.forEach((product) => {
    product.price = product.price - (product.price * discount) / 100;
  });
}

function calculateValueOfAllProducts(products: Array<Product>): number {
  let totalValue = 0;

  for (const product of products) {
    totalValue += product.price * product.quantity;
  }

  return totalValue;
}

function listProductsBycategory(
  products: Array<Product>,
  category: string
): void {
  let productsFromcategory: Product[] = [];

  const sanitazedCategory = sanitize(category);

  for (const product of products) {
    if (product.category === sanitazedCategory)
      productsFromcategory.push(product);
  }

  if (productsFromcategory.length === 0) {
    throw new Error("Não há nenhum produto com essa categoria!");
  } else {
    productsFromcategory.forEach((product) => {
      console.log(`\nProduto ${product.id}:\n`);
      console.log(product);
    });
  }
}

function listAllProducts(products: Array<Product>): void {
  for (const product of products) {
    console.log(`\nProduto ${product.id}:\n`);
    console.log(product);
  }
}

async function main() {
  while (true) {
    try {
      const choice = await question(
        "Você deseja realizar qual ação?\n\n\t1) Criar um produto\n\t2) Aplicar um desconto de um valor X em todos os produtos\n\t3) Somar o valor total de todos os produtos\n\t4) Listar os produtos por categoria\n\t5) Listar todos os produtos\n\t6) Sair\n\nEscolha: "
      );

      if (choice === "1") {
        const id: number =
          Number(
            await question(
              "\nDigite o número do id do produto (deixe vazio para auto incrementar o id): "
            )
          ) || productsList.length + 1;
        const name: string = await question("Digite o nome do produto: ");
        const quantity: number = Number(
          await question("Digite a quantidade do produto em estoque: ")
        );
        const price: number = Number(
          (
            await question(
              "Digite o preço do produto (somente número e ponto flutuante): "
            )
          ).replace(",", ".")
        );
        const category: string = await question(
          "Digite a categoria a qual o produto pertence: "
        );

        const product = createProduct(id, name, quantity, price, category);

        console.log(`\n\nProduto criado com sucesso!\n`);
        console.log(product);
      } else if (choice === "2") {
        if (productsList.length === 0) {
          console.log(
            "\n\nAVISO!!!\nVocê ainda não tem nenhum produto cadastrado!\n\n"
          );
          continue;
        }

        const discountValue = Number(
          await question("\nDigite o valor para aplicar o desconto: ")
        );

        salesDiscountPromotion(productsList, discountValue);

        console.log(
          `\n\nFoi devidamente aplicada a promoção de ${discountValue}% em todos os produtos!`
        );
      } else if (choice === "3") {
        if (productsList.length === 0) {
          console.log(
            "\n\nAVISO!!!\nVocê ainda não tem nenhum produto cadastrado!\n\n"
          );
          continue;
        }

        const totalValueProducts: number =
          calculateValueOfAllProducts(productsList);

        console.log(
          `\nO preço de todos os produtos somados fica em: ${totalValueProducts.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
          )}.`
        );
      } else if (choice === "4") {
        if (productsList.length === 0) {
          console.log(
            "\n\nAVISO!!!\nVocê ainda não tem nenhum produto cadastrado!\n\n"
          );
          continue;
        }

        const category = await question(
          "\nDigite o nome da categoria a qual deseja buscar: "
        );

        listProductsBycategory(productsList, category);
        console.log(
          "\n-- FIM DA LISTA DE PRODUTOS ORGANIZADA POR CATEGORIA --"
        );
      } else if (choice === "5") {
        if (productsList.length === 0) {
          console.log(
            "\n\nAVISO!!!\nVocê ainda não tem nenhum produto cadastrado!\n\n"
          );
          continue;
        }

        listAllProducts(productsList);
        console.log("\n-- FIM DA LISTA DE PRODUTOS --");
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
          console.log(`• ${issue.message}\n\n`);
        }
      } else if (err instanceof Error) {
        console.log(`\n\nERROR: ${err.message}\n\n`);
      } else {
        console.log(`\n\nERROR: ${err}\n\n`);
      }
    }
  }

  rl.close();
}

main();
