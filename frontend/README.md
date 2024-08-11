Documentação da Estrutura da Aplicação
1. Tecnologias Utilizadas
React: Biblioteca principal para a construção da interface da aplicação.
React Bootstrap: Biblioteca de componentes React para Bootstrap.
Bootstrap: Framework CSS para estilização e layout.
PapaParse: Biblioteca para manipulação e parsing de arquivos CSV, usada para baixar CSVs.
2. API
axiosInstance
Descrição: Instância do Axios configurada para autenticação com o backend.
Funções:
Configurações de base URL.
Adiciona interceptadores para incluir o token JWT em todas as requisições.
Trata erros globais.
3. Hooks
useAuth
Descrição: Hook personalizado para gerenciar a autenticação.
Funções:
addToken: Adiciona o token JWT ao armazenamento (cookies/localStorage).
removeToken: Remove o token JWT do armazenamento.
isAuthenticated: Verifica se o usuário está autenticado.
loading: Retorna o estado de carregamento da autenticação.
4. Context
AuthContext
Descrição: Contexto de autenticação da aplicação.
Funções:
Proporciona estado e funções de autenticação para componentes em toda a aplicação.
useAuth: Hook para acessar o contexto de autenticação.
5. Routers
CustomRoutes
Descrição: Rotas protegidas com base no estado de autenticação.
Funções:
PrivateRoute: Protege rotas com base na autenticação do usuário.
Redirect: Redireciona usuários não autenticados para a página de login.
6. Pages
Login: Página de login onde o usuário pode se autenticar.
Home: Página inicial da aplicação.
UploadCSV: Página para upload de arquivos CSV.
ListarLeads: Página para listar todos os leads.
CriarLeads: Página para criar novos leads.
EditarLead: Página para editar um lead existente.
HistoricoLeads: Página para visualizar o histórico dos leads.
NotFound: Página exibida quando a rota não é encontrada.
7. Utils
Descrição: Funções auxiliares e helpers para a aplicação em geral.
Funções Exemplares:
formatDate: Formata datas de acordo com um padrão.
calculateAge: Calcula a idade com base na data de nascimento.
debounce: Função para debouncing de inputs.
8. Components
Descrição: Componentes reutilizáveis utilizados pelas páginas da aplicação.
Componentes Exemplares:
Header: Cabeçalho da aplicação.
Footer: Rodapé da aplicação.
Table: Componente de tabela usado para listar dados.
FormInput: Componente de input para formulários.
Button: Botão genérico utilizado em vários lugares.