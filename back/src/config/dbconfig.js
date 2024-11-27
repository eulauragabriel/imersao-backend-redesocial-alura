import { MongoClient } from "mongodb"; // Importa o MongoClient do pacote mongodb

// Função assíncrona para conectar ao banco de dados
export default async function conectarDB(stringConexao) {

    let mongoClient; // Declara uma variável para armazenar o cliente MongoDB

    try {
        // Cria uma nova instância do MongoClient usando a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);

        console.log("Conectando ao banco de dados..."); // Log para indicar que a conexão está sendo iniciada

        await mongoClient.connect(); // Tenta conectar ao banco de dados

        console.log("Conexão estabelecida com sucesso!"); // Log para indicar que a conexão foi bem-sucedida

        return mongoClient; // Retorna o cliente MongoDB conectado

    } catch (erro) {
        // Captura qualquer erro que ocorrer durante a conexão
        console.erro("Erro ao conectar com o banco de dados:", erro); // Log de erro

        process.exit(); // Encerra o processo em caso de erro
    }
}
