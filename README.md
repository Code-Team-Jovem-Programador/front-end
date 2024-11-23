# Primeiros passos com o aplicativo Create React

Após clonar o repositório, crie um arquivo ".env" com a váriavel "PORT=5173", exclua a pasta "node_modules" e os arquivos "package.json" e "package-lock.json".

## Scripts Disponíveis

No diretório do projeto, você pode executar:

## `npm install`

E logo após:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:5173](http://localhost:5173) para visualizá-lo em seu navegador.

Portas usadas no projeto:

Rota para Login e acesso ao Token JWT:
https://gerenciador-estoque-prod.onrender.com/token
Possui o método POST

Rota para cadastro de novo usuário:
https://gerenciador-estoque-prod.onrender.com/register/
Possui o método POST

Rota para geração de novo token:
https://gerenciador-estoque-prod.onrender.com/token/refresh
Possui o método POST

Rota para ver todos os produtos:
https://gerenciador-estoque-prod.onrender.com/produtos/
Possui os métodos GET e POST

Rota para listar produtos:
https://gerenciador-estoque-prod.onrender.com/produtos/listar
Possui o método GET

Rota para pesquisar produtos por ID:
https://gerenciador-estoque-prod.onrender.com/produtos/{id}
Possui os métodos GET / PUT / DELETE

Rota para exportar tabela em .CSV:
https://gerenciador-estoque-prod.onrender.com/export/csv/
Possui o método POST

Rota para exportar arquivos em .XLS
https://gerenciador-estoque-prod.onrender.com/export/xlsx/
Possui o método POST

Rota para exportar arquivos em .PDF:
https://gerenciador-estoque-prod.onrender.com/export/pdf/
Possui o método POST
