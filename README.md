# hackathon-secomp-tractian

## Motivações

Com a nossa solução, supervisores podem atribuir tarefas pelo nosso site através de descrições detalhadas que são transformadas em módulos de tarefas na nossa plataforma e salvas no nosso banco de dados. Ao inserir essas tarefas na plataforma, nosso sistema é responsável por quebrar a descrição em pequenas tarefas resumidas por uma sequência de passos a serem seguidos pelos operadores. Também é possível linkar o conteúdo de um `PDF` (como um manual, por exemplo, em qualquer linguagem) para que os passos sejam complementados de forma mais técnica e precisa, de acordo com o modelo do maquinário diponibilizado. Além disso, a plataforma também sugere as ferramentas que podem ser necessárias para a execução da tarefa, assim como seus respectivos códigos `SAP` e disponibilidade no estoque para faciltar as suas buscas. Por último, a plataforma gera um documento `PDF` com as respectivas tarefas e subtarefas, assim como os passos a serem seguidos e as ferramentas a serem requisitadas pelo amoxarifado. Dessa forma, o operador pode fazer o `download` do documento para que possa consultá-lo de forma `offline` sem complicações de conexão ou latência.

O foco da nossa plataforma é o uso mobile instantâneo, genrando relatórios precisos da atividade a ser realizada pelos operadores. Ela também considera as barreiras linguísticas de manuais em diferentes idiomas que português, sendo capaz de consumir conteúdos em qualquer linguagem e responder em português.

## Testes!

É possível testar a plataforma com o seguinte exemplo abaixo. Basta realizar um GET na url especificada passando a descriao como parâmetro de query, e a API faz o resto automaticamente! Ela é responsável por construir os prompts e fazer o parsing correto de cada resposta para construir a tarefa final.

```bash
curl http://localhost:5000/generate?description="Realizar uma inspeção detalhada na Peneira Poligonal para garantir que não há acúmulo de resíduos que possam comprometer seu funcionamento. Verificar o aquecimento do equipamento e o nível de ruído durante a operação."
```

A tarefa final é gerada seguindo o seguinte template:

```json
{
  "data": [
    {
      "title": "Routine Inspection",
      "description": "A general inspection service to ensure the equipment is functioning properly.",
      "suggestedSteps": [
        "Turn off the power",
        "Inspect all moving parts",
        "Check for loose screws",
        "Test equipment functionality after inspection"
      ],
      "suggestedTools": [
        {
          "code": "T001",
          "name": "Inspection Flashlight",
          "quantity": 1,
          "manual": "https://example.com/inspection-flashlight-manual.pdf"
        },
        {
          "code": "T002",
          "name": "Adjustable Wrench",
          "quantity": 1,
          "manual": "https://example.com/adjustable-wrench-manual.pdf"
        }
      ],
      "estimatedTime": 60,
    }
  ]
}

```

## Arquitetura

Nossa plataforma consiste em um site focado para mobile construído em `Reactjs`, que se comunica com nosso __backend__ feito em `Flask` (Python).

O __backend__ serve uma REST API que lida com as interações com o banco de dados em `sqlite` (feito em `api/DB_Handler.py`) e com o handler do `chatgpt` (disponível em `gpt/GPTHandler.py`).

Os __endpoints__ disponíveis para interações com o __backend__ são visíveis em `server.py`.

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

Basta iniciar o flask:

```bash
cd api
python3 server.py
```
