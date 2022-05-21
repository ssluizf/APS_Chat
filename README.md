# Chat APS

## Pasta Server
### Instalar as depêndencias do servidor
```
yarn install
```
### Criar arquivo .env
Para a conexão com o banco de dados (MongoDB). Crie um arquivo .env na pasta "/server" e insira as informações de usuário, senha e <i>secret</i> - caracteres aleatórios usados na geração do hash das senhas.

Seguindo o modelo .env.example 
```
DB_USER=usuario
DB_PASS=senha
SECRET=SKJDkjlSAf
```
Executa a aplicação
```
yarn start
```
## Pasta Web
Instalar as depêndencias do cliente
```
yarn install
```
Executa a aplicação
```
yarn start
```