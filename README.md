# App Contatos
Este aplicativo de exemplo foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Trainee e destina-se a gerenciar contatos. Siga as instruções abaixo para executá-lo localmente.
<hr/>
<p align="center">
	<img src="https://github.com/AlarconVinicius/app-contatos/blob/main/docs/landingpage.png">
</p>
<hr/>
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
2. Na pasta raiz do projeto, acesse a pasta src/web/ILT.Contatos.WebApp/app-contatos.
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

## Informações de Contato

- **Portfólio**: [Link para o seu Portfólio](https://github.com/AlarconVinicius/)
- **LinkedIn**: [Link para o seu LinkedIn](https://www.linkedin.com/in/vin%C3%ADcius-alarcon-52a8a820a/)
