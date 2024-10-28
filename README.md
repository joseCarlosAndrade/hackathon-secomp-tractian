# hackathon-secomp-tractian

## Motivações

Com a nossa solução, supervisores podem atribuir tarefas pelo nosso site através de descrições detalhadas que são transformadas em módulos de tarefas na nossa plataforma e salvas no nosso banco de dados. Ao inserir essas tarefas na plataforma, nosso sistema é responsável por quebrar a descrição em pequenas tarefas resumidas por uma sequência de passos a serem seguidos pelos operadores. Também é possível linkar o conteúdo de um `PDF` (como um manual, por exemplo, em qualquer linguagem) para que os passos sejam complementados de forma mais técnica e precisa, de acordo com o modelo do maquinário diponibilizado. Além disso, a plataforma também sugere as ferramentas que podem ser necessárias para a execução da tarefa, assim como seus respectivos códigos `SAP` e disponibilidade no estoque para faciltar as suas buscas. Por último, a plataforma gera um documento `PDF` com as respectivas tarefas e subtarefas, assim como os passos a serem seguidos e as ferramentas a serem requisitadas pelo amoxarifado. Dessa forma, o operador pode fazer o `download` do documento para que possa consultá-lo de forma `offline` sem complicações de conexão ou latência.

O foco da nossa plataforma é o uso mobile instantâneo, genrando relatórios precisos da atividade a ser realizada pelos operadores. Ela também considera as barreiras linguísticas de manuais em diferentes idiomas que português, sendo capaz de consumir conteúdos em qualquer linguagem e responder em português.

## Arquitetura

Nossa plataforma consiste em um site focado para mobile construído em `Reactjs`, que se comunica com nosso __backend__ feito em `Flask` (Python).

O __backend__ serve uma REST API que lida com as interações com o banco de dados em `sqlite` (feito em `api/DB_Handler.py`) e com o handler do `chatgpt` (disponível em `gpt/GPTHandler.py`).

Os __endpoints__ disponíveis para interações com o __backend__ são:

**TODO**

## Instruções

Ter python 3!
Instalar os pacotes abaixo:

```bash
pip install openai
pip install Flask
pip install PyMuPDF
```

Preencher o aquivo `.env` dentro do pacote `gpt/` usando o `.env.example` como guia para a autenticação na plataforma **OpenAi**.

## Execução da API
