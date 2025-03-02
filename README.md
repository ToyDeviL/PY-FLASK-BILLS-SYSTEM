Roadmap Atualizado do Projeto: Aplicação de Gerenciamento Financeiro com Python Flask

Fase 1: Configuração Inicial e Tema Global

Tarefa 1.1: Configuração do Ambiente Python
Mantenha as etapas de instalação do Python, pip e dependências (PostgreSQL).
Verificação da instalação.
Criação do diretório do projeto e configuração de permissões.
Instalação do Flask e psycopg2-binary.
Estrutura de diretórios do projeto.
Tarefa 1.2: Implementação do Tema Global e Login
Verificação e Ajuste do login.html:
Analise o arquivo login.html fornecido no repositório.
Verifique a estilização e a responsividade.
Implemente testes de login fácil para agilizar o desenvolvimento.
Verificação e Ajuste do server.py:
Analise o arquivo server.py e verifique se há inconsistências.
Ajuste o server.py para facilitar o login durante os testes iniciais.
styles.css como Diretriz Imutável:
O arquivo styles.css existente será a base para toda a estilização do projeto.
Garanta que todas as novas telas e componentes utilizem esse arquivo.
Priorize a organização e otimização do styles.css com variáveis CSS e data-theme para os temas claro e escuro.
Implemente a lógica JavaScript para alternar entre os temas e persistir a escolha no localStorage.
Adapte o server.py para suportar a lógica do tema.
Tarefa 1.3: Funcionalidade de Logout
Mantenha a implementação do botão de logout e a rota /logout no server.py.
Fase 2: Funcionalidades de Despesas e Proventos

Tarefa 2.1: Adicionar Despesa
Manter a criação de um formulário modal reutilizável para adicionar despesas.
Implementar a lógica no server.py para salvar os dados no banco de dados.
Tarefa 2.2: Adicionar Provento
Manter a criação de um formulário modal reutilizável para adicionar proventos.
Implementar a lógica no server.py para salvar os dados no banco de dados.
Fase 3: Listagem e Filtro de Despesas

Tarefa 3.1: Listagem de Despesas
Manter a criação de uma tabela para exibir as despesas cadastradas com paginação e ordenação.
Implementar a lógica no server.py para buscar e exibir os dados do banco de dados.
Tarefa 3.2: Filtro de Despesas
Manter a implementação dos campos de filtro por período e a lógica no server.py.
Fase 4: Relatórios e Gráficos

Tarefa 4.1: Relatórios de Despesas
Manter a implementação dos filtros, geração de relatórios e exportação para PDF e CSV.
Implementar a lógica no server.py para filtrar e exibir os dados em formato de relatório.
Tarefa 4.2: Geração de Gráficos
Manter a utilização do Chart.js para gerar gráficos de despesas por categoria.
Exibir os gráficos na tela de relatórios.
Fase 5: Objetivos e Metas

Tarefa 5.1: Tela de Objetivos
Manter a criação da tela para inserir e listar objetivos.
Tarefa 5.2: Adicionar Nova Meta
Manter a implementação do formulário modal para adicionar novas metas.
Implementar a lógica no server.py para salvar as metas no banco de dados.
Tarefa 5.3: Contribuições e Progresso
Manter a implementação do formulário modal para adicionar contribuições.
Implementar a lógica no server.py para somar as contribuições e exibir o progresso.
Manter a implementação do botão de excluir meta e das notificações de progresso.
Fase 6: Criação do Banco de Dados

Tarefa 6.1: Modelagem do Banco de Dados
Manter a análise da tabela contas e a definição de novas tabelas.
Definir os campos, tipos de dados e relações entre as tabelas.
Criar o diagrama ER.
Tarefa 6.2: Implementação do Banco de Dados
Manter a criação do banco de dados PostgreSQL, tabelas e chaves.
Implementar as consultas SQL para CRUD.
Criar o script de criação do banco de dados.
Utilizar uma ferramenta de migração de banco de dados.
Tarefa 6.3: Integração com o Servidor
Manter a configuração da conexão do server.py com o PostgreSQL.
Implementar as rotas e funções para interagir com o banco de dados.
Considerações Finais

Mantenha as boas práticas de desenvolvimento web, validações de formulário e testes em diferentes navegadores e dispositivos.
Realize testes unitários a cada funcionalidade implementada.
Priorize a estilização das telas modais.
Crie arquivos de configuração de telas separados para manter o código organizado.
Comente as seções do código em PT-BR.
Mantenha a documentação do projeto atualizada.
Configure um pipeline de CI/CD.
A diretriz de fornecer apenas os trechos de código modificados será seguida.
