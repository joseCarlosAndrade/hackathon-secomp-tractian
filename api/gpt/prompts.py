
INITIAL_PROMPT = """seu trabalho agora vai ser responder as proiximas perguntas sem acrescentar nenhuma informação alem da que foi requisitada, da maneira em que foi requisitada. Para contexto, voce oferecera ajuda a um operador de maquinas industriais quanto as etapas e ferramentas recomendadas disponiveis. Responda com frases objetivas sem decoraçoes.""" 

GENERATE_TITLE ="""crie um titulo resumido para a seguinte tarefa: '{}'"""

GENERATE_STEPS = """crie uma lista de até 10 passos enumerados separados por quebra de linha para concluir a tarefa enviada. Os passos devem ser descritivos e técnicos."""

INCLUDE_FILE="""inclua o seguinte pdf para os proximos prompts: {}"""

GENERATE_TOOLS = """agora crie uma lista de ferramentas necessarias para a tarefa junto com seu sap code e um link para manual (o link pode ser simulado)
mas no seguinte formato exemplo:
"suggestedTools": [
        {
          "code": "T001",
          "name": "Lanterna de Inpeçao",
          "quantity": 1,
          "manual": "https://example.com/inspection-flashlight-manual.pdf"
        },
        {
          "code": "T002",
          "name": "Chave ajustável",
          "quantity": 1,
          "manual": "https://example.com/adjustable-wrench-manual.pdf"
        }
      ],

"""

GENERATE_ESTIMATED_TIME = """Em poucas palavras, gere uma estimativa em minutos para o tempo e realização da tarefa."""