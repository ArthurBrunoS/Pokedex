# Pokédex com PokeAPI

[Demonstração online](https://arthurbrunos.github.io/projeto-listagem-pokemon/demos/pokedex/)

Aplicação de estudo para explorar Pokémon com busca por nome ou número, paginação e detalhes.

## Tecnologias

HTML5, CSS3 e JavaScript puro. Dados e imagens da [PokeAPI](https://pokeapi.co/).

## Funcionalidades

- Busca normalizada com envio por Enter e opção de voltar à listagem.
- Paginação de 24 resultados, consultas em paralelo e cancelamento de buscas anteriores.
- Mensagens de carregamento, Pokémon não encontrado e falha de conexão.
- Cards acessíveis por teclado e diálogo com tipos, altura, peso e habilidades.

## Executar localmente

1. Clone este repositório e abra a pasta no VS Code.
2. Abra `src/index.html` com a extensão Live Server, ou sirva a pasta com um servidor HTTP estático.
3. Acesse a página no navegador. O `index.html` da raiz é o ponto de entrada e direciona à página principal.

É necessária conexão com a internet para consultar a API. As mensagens e os dados de reserva documentam o comportamento quando o serviço não responde.

## Validação

Com Node.js 22 ou superior, execute `node --test`. Os testes usam respostas simuladas para verificar listagem, 404, falha de rede, concorrência e detalhes; não consultam a API real.

Checklist de navegador:

- [ ] Buscar ` Pikachu ` e `25`; ambos devem encontrar Pikachu.
- [ ] Buscar um nome inexistente e desconectar a rede; conferir mensagens e recuperação com Ver todos.
- [ ] Trocar de página e iniciar buscas rápidas; apenas a última consulta deve aparecer.
- [ ] Abrir detalhes após uma busca, fechar com Escape e conferir o retorno de foco.

A verificação visual e as capturas de tela devem ser feitas após abrir a versão atual no navegador. Não há capturas publicadas nem garantia de validação visual nesta revisão.

## Demonstração e publicação

Demonstração publicada no GitHub Pages: https://arthurbrunos.github.io/projeto-listagem-pokemon/demos/pokedex/

O site reúne cópias estáticas dos projetos no repositório projeto-listagem-pokemon. A versão publicada está registrada em projetos/versoes.json desse repositório. Alterações posteriores neste repositório de origem precisam ser copiadas novamente para atualizar a demonstração.

## Limitações e autoria

Aplicação de estudo. A disponibilidade e os dados da API dependem do serviço externo.

Este README descreve a versão proposta nesta revisão. O histórico do Git preserva os autores e as contribuições anteriores. Materiais de curso, imagens e serviços de terceiros devem ter suas condições de uso verificadas antes de uma redistribuição; esta revisão não atribui autoria exclusiva nem adiciona uma licença aos recursos existentes.
