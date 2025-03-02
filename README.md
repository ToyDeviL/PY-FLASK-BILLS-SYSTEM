# PY-FLASK-BILLS-SYSTEM

# Roadmap do Projeto: Aplicação de Gerenciamento Financeiro com Python Flask

Este roadmap detalha as etapas para a criação da sua aplicação de gerenciamento financeiro, utilizando Python Flask e as melhores práticas de CSS, com foco nas correções para um ambiente Python.

## Fase 1: Configuração Inicial e Tema Global

### Tarefa 1.1: Configuração do Ambiente Python
1. **Instalar o Python 3, pip e dependências:**
    ```bash
    sudo apt update && sudo apt upgrade -y
    sudo apt install python3 python3-pip postgresql postgresql-contrib -y
    ```
2. **Verificar a instalação:**
    ```bash
    python3 --version
    pip3 --version
    ```
3. **Criar um diretório para o projeto:**
    ```bash
    mkdir /bills
    cd /bills
    ```
4. **Configurar permissões para o diretório:**
    ```bash
    sudo chown -R $USER:$USER /bills
    sudo chmod -R 755 /bills
    ```
5. **Instalar o Flask e as dependências:**
    ```bash
    pip3 install Flask psycopg2-binary
    ```
6. **Criar a estrutura de diretórios do projeto (/bills).**

### Tarefa 1.2: Implementação do Tema Global
1. **Criar a tela de login com design responsivo (HTML/CSS).**
2. **Adicionar um botão de alternância de tema (claro/escuro) na tela de login.**
3. **Utilizar localStorage para persistir a escolha do tema (JavaScript).**
4. **Implementar a lógica JavaScript para alternar entre os temas.**
5. **Garantir que o tema seja aplicado globalmente (todas as páginas).**
6. **Otimizar o styles.css com variáveis CSS e data-theme para os temas.**
7. **Criar o arquivo server.py e adicionar as rotas para suportar o tema.**

### Tarefa 1.3: Funcionalidade de Logout
1. **Adicionar um botão de logout no dashboard.html.**
2. **Criar a rota /logout no server.py para redirecionar para a tela de login.**

## Fase 2: Funcionalidades de Despesas e Proventos

### Tarefa 2.1: Adicionar Despesa
1. **Criar um formulário modal reutilizável para adicionar despesas (HTML/CSS/JavaScript):**
    - Categoria (dropdown com histórico e opção de nova categoria).
    - Data (datepicker).
    - Descrição (textarea).
    - Checkbox para despesa recorrente.
2. **Implementar a lógica no server.py para salvar os dados no banco de dados.**

### Tarefa 2.2: Adicionar Provento
1. **Criar um formulário modal reutilizável para adicionar proventos (HTML/CSS/JavaScript):**
    - Salário mensal (input numérico).
    - Mês e ano (datepicker ou campos separados).
2. **Implementar a lógica no server.py para salvar os dados no banco de dados.**

## Fase 3: Listagem e Filtro de Despesas

### Tarefa 3.1: Listagem de Despesas
1. **Criar uma tabela para exibir as despesas cadastradas com paginação e ordenação (HTML/CSS/JavaScript):**
    - Data.
    - Categoria.
    - Descrição.
    - Valor.
    - Botões de alterar e excluir.
2. **Implementar a lógica no server.py para buscar e exibir os dados do banco de dados.**

### Tarefa 3.2: Filtro de Despesas
1. **Adicionar campos para data inicial e final e um botão de filtro (HTML/CSS/JavaScript).**
2. **Implementar a lógica no server.py para filtrar as despesas por período.**

## Fase 4: Relatórios e Gráficos

### Tarefa 4.1: Relatórios de Despesas
1. **Criar campos de filtro por período e um botão de gerar relatório (HTML/CSS/JavaScript).**
2. **Implementar a lógica no server.py para filtrar e exibir os dados em formato de relatório.**
3. **Adicionar funcionalidade para exportar relatórios em PDF e CSV.**

### Tarefa 4.2: Geração de Gráficos
1. **Utilizar uma biblioteca de gráficos (Chart.js) para gerar gráficos de despesas por categoria.**
2. **Exibir os gráficos na tela de relatórios (HTML/CSS/JavaScript).**

## Fase 5: Objetivos e Metas

### Tarefa 5.1: Tela de Objetivos
1. **Criar uma tela para inserir e listar objetivos (HTML/CSS/JavaScript).**

### Tarefa 5.2: Adicionar Nova Meta
1. **Adicionar um botão para adicionar uma nova meta.**
2. **Exibir um formulário modal reutilizável com os campos (HTML/CSS/JavaScript):**
    - Descrição da meta.
    - Valor alvo da meta.
    - Data alvo para conclusão da meta.
3. **Implementar a lógica no server.py para salvar as metas no banco de dados.**

### Tarefa 5.3: Contribuições e Progresso
1. **Adicionar um botão para adicionar contribuições a uma meta.**
2. **Exibir um formulário modal para adicionar o valor da contribuição (HTML/CSS/JavaScript).**
3. **Implementar a lógica no server.py para somar as contribuições e exibir o valor acumulado e a barra de progresso na lista de metas.**
4. **Adicionar um botão de excluir a meta.**
5. **Implementar notificações para informar o usuário sobre o progresso das metas.**

## Fase 6: Criação do Banco de Dados

### Tarefa 6.1: Modelagem do Banco de Dados
1. **Analisar a tabela contas existente e definir novas tabelas (usuários, metas, contribuições) se necessário.**
2. **Definir os campos (colunas) e tipos de dados de cada tabela.**
3. **Definir as relações entre as tabelas (chaves primárias e estrangeiras).**
4. **Criar um diagrama ER para visualização.**

### Tarefa 6.2: Implementação do Banco de Dados
1. **Criar o banco de dados PostgreSQL no Raspberry Pi.**
2. **Criar as tabelas e definir as chaves.**
3. **Implementar as consultas SQL para CRUD.**
4. **Criar script de criação do banco de dados.**
5. **Utilizar uma ferramenta de migração de banco de dados (como Flask-Migrate).**

### Tarefa 6.3: Integração com o Servidor
1. **Configurar a conexão do server.py com o PostgreSQL (usando psycopg2).**
2. **Implementar as rotas e funções no server.py para interagir com o banco de dados.**

#### Informações do Banco de Dados
- **Nome do Banco de Dados:** contas
- **Usuário:** andrino
- **Senha:** Rebecca@2023

## Considerações Finais
- Utilizar boas práticas de desenvolvimento web (HTML semântico, CSS organizado, Python modular).
- Implementar validações de formulário.
- Realizar testes em diferentes navegadores e dispositivos.
- A cada funcionalidade implementada, realizar testes unitários.
- Dar ênfase no estilo das telas modais.
- Criar arquivos de configuração de telas separados para que o código não fique muito grande.
- Comentar as seções do código em PT-BR, explicando o que cada parte faz, para facilitar o aprendizado.
- Adicionar e manter a documentação do projeto.
- Configurar um pipeline de CI/CD para automatizar testes, builds e deploys.

### Diretriz
Toda vez que a AI escrever um código, ela deve fornecer apenas o trecho modificado para que eu possa inserir no local correto, a fim de diminuir a carga de processamento e agilizar o desenvolvimento.
