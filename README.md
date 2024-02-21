# App Contatos
Este é um aplicativo de exemplo para gerenciar contatos. Siga as instruções abaixo para executar o aplicativo localmente.

## Rodando o Banco de Dados
1. Certifique-se de ter o Docker instalado em sua máquina.
2. Na pasta raiz do projeto, execute o seguinte comando no terminal:
```bash
docker-compose -f "./docker/docker-compose.yml" -p db-app-contatos up -d --build
```
Este comando iniciará o banco de dados da aplicação no Docker.

## Rodando o Backend
1. Certifique-se de ter o .NET Core SDK instalado em sua máquina.
2. Navegue até a pasta src/services/ILT.Contatos.Api.
3. No terminal, execute o seguinte comando:
```bash
dotnet run --launch-profile https
```
Este comando irá iniciar o backend da aplicação.

## Rodando o Frontend
1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Na pasta raiz do projeto, acesse a pasta src/web/ILT.Web.App/app-contatos.
3. No terminal, execute o seguinte comando:
```bash
npm install
```
11. Após a instalação das dependências, execute o comando:
```bash
npm run dev
```
Este comando iniciará o servidor de desenvolvimento do frontend.

Agora você pode acessar a aplicação frontend no seu navegador visitando http://localhost:3000 e o backend http://localhost:5171/swagger/index.html || https://localhost:7149/swagger/index.html
