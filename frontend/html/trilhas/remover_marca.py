# pip install PyMuPDF

import fitz  # PyMuPDF

input_path = r"c:\estudos-programação\html-css\site-teste-Estevan-Maito\Start\Start-Project-Group3\frontend\html\trilhas\mobile.pdf"
output_path = r"c:\estudos-programação\html-css\site-teste-Estevan-Maito\Start\Start-Project-Group3\frontend\html\trilhas\mobile_sem_marca_dagua_e_ys.pdf"

# Abrir o PDF
doc = fitz.open(input_path)

for page in doc:
    words = page.get_text("words")  # Extrair todas as palavras
    for w in words:
        text = w[4]
        bbox = w[:4]
        if "ÿ" in text:
            # Cobrir apenas a posição do "ÿ"
            rect = fitz.Rect(bbox)
            page.draw_rect(rect, color=(1, 1, 1), fill=(1, 1, 1))

# Agora remover também blocos com "Machine Translated by Google"
for page in doc:
    blocks = page.get_text("blocks")
    for block in blocks:
        text = block[4]
        if "Machine Translated by Google" in text:
            rect = fitz.Rect(block[:4])
            page.draw_rect(rect, color=(1, 1, 1), fill=(1, 1, 1))

doc.save(output_path)
doc.close()

print("Pronto! PDF limpo sem 'ÿ' e sem marca d'água:", output_path)
