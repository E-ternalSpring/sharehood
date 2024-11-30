# Nome do Projeto: **ShareHood**

Este repositório contém o código-fonte do projeto **ShareHood**, um aplicativo desenvolvido em React Native como parte das atividades acadêmicas da faculdade. O aplicativo foi projetado para facilitar o compartilhamento de recursos e serviços entre os moradores de um condomínio, promovendo a economia colaborativa e a interação entre a comunidade.

**Status do Projeto**: O projeto ainda está em desenvolvimento. Atualmente, o frontend está funcional, mas algumas funcionalidades não possuem integração com o backend. A seguir estão os detalhes das funcionalidades implementadas e aquelas que ainda não possuem backend.

## Funcionalidades Principais:
- **Cadastro e Login de Usuários**: Usuários podem se cadastrar com CPF, nome completo, e-mail e endereço, e realizar login utilizando o CPF. **Ainda não há implementação no backend** para o cadastro e login.
- **Cadastro de Condomínios**: Moradores podem cadastrar seu condomínio para facilitar a interação dentro da comunidade. **Ainda não há implementação no backend** para o cadastro de condomínio.
- **Gestão de Recursos**: Permite que moradores cadastrem itens para empréstimo (como ferramentas e eletrodomésticos). **O backend para a aba Gestão está implementado** e já permite o cadastro e consulta de recursos cadastrados pelo usuário.
- **Oferta e solicitação de Recursos e Serviços**: Usuários podem oferecer ou solicitar recursos e serviços, gratuitos ou pagos, com valores simbólicos. **Ainda não há implementação no backend** para a oferta e requisição de recursos e serviços.
- **Persistência de Dados Local**: Utiliza SQLite para persistir dados de usuários e recursos, além de AsyncStorage para dados locais no aplicativo.
- **Interface Simples e Intuitiva**: Design otimizado para uma experiência de usuário agradável e fluida.

## Tecnologias Utilizadas:
- **React Native**: Para o desenvolvimento de aplicativos móveis multiplataforma.
- **TypeScript**: Linguagem de programação utilizada para garantir tipagem estática e maior segurança no código.
- **Node.js**: Backend do projeto, usado para a criação de APIs e gerenciamento de dados.
- **SQLite**: Banco de dados utilizado para armazenar informações sobre usuários e recursos.
- **Expo**: Framework para facilitar o desenvolvimento e a execução do projeto React Native.
- **AsyncStorage**: Usado para armazenamento local de dados no dispositivo do usuário.

## Como Executar o Projeto:
1. Clone este repositório.
2. Navegue até o diretório do projeto.
3. Execute `npm install` ou `yarn install` para instalar as dependências.
4. Execute `npm start` ou `yarn start` para iniciar o aplicativo.

## Contribuições:
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
