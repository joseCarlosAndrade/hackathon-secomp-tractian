import json

from markdown_pdf import MarkdownPdf
from markdown_pdf import Section

pdf = MarkdownPdf(toc_level=2)

def json_to_markdown(json_data):
    # Extract the basic information from the JSON data
    id_ = json_data.get("id", "N/A")
    data = json_data.get("data", "N/A")
    tarefas_manutencao = json_data.get("tarefasManutencao", [])
    
    # Start building the markdown content
    markdown = f"# 📅 Relatório de Manutenção "
    markdown += f" {id_} do dia "
    markdown += f"{data}\n\n"
    
    
    # Iterate through each task and build its section
    for tarefa in tarefas_manutencao:
        nome = tarefa.get("nome", "N/A")
        status = tarefa.get("status", "N/A")
        descricao = tarefa.get("descricao", "N/A")
        ferramentas = tarefa.get("ferramentasSugeridas", [])
        etapas = tarefa.get("etapas", [])
        manuais = tarefa.get("manual", [])
        
        markdown += f"## Tarefa: {nome}\n"
        markdown += f"- **Status:** {status}\n"
        markdown += f"- **Descrição:** {descricao}\n"

        if etapas:
            markdown += "\n#### 📄 Etapas: \n"
            for etapa in etapas:
                # Access the "etapa" field correctly
                etapa_nome = etapa.get("etapa", "N/A")
                markdown += f" - {etapa_nome}\n"  # Use etapa_nome to format the output
       
        # If there are suggested tools, list them in a table
        if ferramentas:
            markdown += "\n#### 🔨 Sugestão de Ferramentas:\n"
            for ferramenta in ferramentas:
                nome_ferramenta = ferramenta.get("nomeFerramenta", "N/A")
                codigo_ferramenta = ferramenta.get("codigoFerramenta", "N/A")
                quantidade_disponivel = ferramenta.get("quantidadeDisponivel", "N/A")
                markdown += f"- {nome_ferramenta} (Código SAP {codigo_ferramenta}, Qtd disponível: {quantidade_disponivel})\n"
        
        tempo = tarefa.get("tempo", "N/A")
        markdown += f"#### 🕐 Tempo estimado: {tempo}\n"


        if manuais:
            markdown += f"#### 📌 Manuais sugeridos: \n"
            manual_nome = manuais.get("name", "N/A")
            manual_pags = manuais.get("pages", "N/A")
            markdown += f" - {manual_nome} pag({manual_pags})\n"
             
        # Add an extra line break for readability
        markdown += "\n\n\n"
    
    return markdown

def generate_pdf(data):
    pdf.add_section(Section(json_to_markdown(data)))
    pdf.meta["title"] = "User Guide"
    pdf.save("guide.pdf")


with open('json_example.json', 'r') as file:
        data = json.load(file)

generate_pdf(data)



