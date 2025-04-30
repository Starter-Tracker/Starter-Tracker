from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

employment_translations = {
    "Empregado, tempo integral": "employed, full-time",
    "Empregado, meio período": "employed, part-time",
    "Trabalhador independente, freelancer ou autônomo": "independent contractor, freelancer, or self-employed",
    "Desempregado, mas procurando trabalho": "not employed, but looking for work",
    "Desempregado e não procurando trabalho": "not employed, and not looking for work",
    "Estudante, tempo integral": "student, full-time",
    "Estudante, meio período": "student, part-time",
    "Aposentado": "retired",
    "Prefiro não dizer": "i prefer not to say",
    "Empregado": "employed, full-time",  
    "Estudante": "student, full-time"    
}

def translate_employment(value):
    """Traduz valores de employment usando o dicionário"""
    if pd.isna(value) or not value.strip():
        return "unknown"
    
    # Primeiro tenta traduzir o valor completo
    if value in employment_translations:
        return employment_translations[value]
    
    # Se não encontrar, procura por partes (caso tenha múltiplos valores separados por ;)
    translated_parts = []
    for part in value.split(';'):
        part = part.strip()
        if part in employment_translations:
            translated_parts.append(employment_translations[part])
        else:
            # Tenta encontrar correspondência parcial
            found = False
            for pt, en in employment_translations.items():
                if pt.startswith(part) or part in pt:
                    translated_parts.append(en)
                    found = True
                    break
            if not found:
                translated_parts.append(part.lower())  # Mantém o original em lowercase
    
    return ";".join(translated_parts)




def preprocess_data(input_json):
    # Valida se input_json é um dicionário
    if not isinstance(input_json, dict):
        raise ValueError(f"Esperado um dicionário, recebido: {type(input_json)}")

    df = pd.DataFrame([input_json])  
    # No seu tratamento dos dados recebidos
    

    # Colunas com MultiLabelBinarizer
    colunas_multilabel = [
        'LanguageHaveWorkedWith', 'WebframeHaveWorkedWith', 'DatabaseHaveWorkedWith', 'PlatformHaveWorkedWith',
        'ToolsTechHaveWorkedWith', 'LanguageWantToWorkWith', 'WebframeWantToWorkWith', 'DatabaseWantToWorkWith',
        'PlatformWantToWorkWith', 'ToolsTechWantToWorkWith', 'Employment'
    ]

    # Colunas numéricas esperadas
    colunas_numericas = ['YearsCode', 'Age', 'WorkWeekHrs']

    # Tratamento de colunas numéricas
    for col in colunas_numericas:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)  # Converte para float, NaN vira 0
            print(f"Valores em {col} após conversão:", df[col].tolist())
    
    if 'Employment' in df.columns:
        # Aplica a tradução
        df['Employment'] = df['Employment'].apply(translate_employment)
        print("Valores de Employment após tradução:", df['Employment'].tolist())

    # Tratamento de colunas MultiLabelBinarizer
    for col in colunas_multilabel:
        if col in df.columns:
            print(f"Valores em {col} antes do split:", df[col].tolist())
            # Garante que valores sejam strings e lida com NaN
            df[col] = df[col].fillna('').astype(str)
            # Divide apenas se for uma string não vazia e contém ';'
            df[col] = df[col].apply(lambda x: x.lower().split(';') if x and ';' in x else [x.lower()] if x else ['desconhecido'])
            print(f"Valores em {col} após split:", df[col].tolist())
        else:
            df[col] = [['desconhecido'] for _ in range(len(df))]
            print(f"Coluna {col} não encontrada, preenchida com ['desconhecido']")

    # Aplica MultiLabelBinarizer
    for col in colunas_multilabel:
        if col in df:
            mlb = mlb_encoders[col]
            try:
                df_encoded = pd.DataFrame(
                    mlb.transform(df[col]),
                    columns=[f'{col}_{cls}' for cls in mlb.classes_],
                    index=df.index
                )
                df = pd.concat([df.drop(columns=[col]), df_encoded], axis=1)
            except Exception as e:
                print(f"Erro ao aplicar MultiLabelBinarizer em {col}: {e}")
                raise

    print("DataFrame processado:", df)  # Depuração
    print("Tipos de dados em processed_df:", df.dtypes)  # Depuração
    return df

script_dir = os.path.dirname(os.path.abspath(__file__))

# Sobe um nível (para "src") e depois vai para "modelo"
model_dir = os.path.join(script_dir, '..', 'modelo')

# Caminhos completos para os arquivos
model_path = os.path.join(model_dir, 'RandomForest.sav')
mlb_path = os.path.join(model_dir, 'multi_label_binarizers.pkl')

# Carrega os arquivos
with open(model_path, 'rb') as f:
    model = pickle.load(f)

with open(mlb_path, 'rb') as f:
    mlb_encoders = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
  # Espera uma lista com os dados
        print("Dados recebidos:", data)  # Depuração
        processed_df = preprocess_data(data)
        print("Shape do DataFrame processado:", processed_df.shape)  # Depuração

        # Verifica se todas as colunas são numéricas
        if not processed_df.select_dtypes(include=[np.number]).columns.equals(processed_df.columns):
            non_numeric_cols = processed_df.select_dtypes(exclude=[np.number]).columns
            raise ValueError(f"O DataFrame contém colunas não numéricas: {non_numeric_cols}")

        # Converte para array numpy e faz a predição
        # input_array = processed_df.to_numpy().reshape(1, -1)
        input_array = processed_df.values.astype(float)
        print("Input array shape:", input_array.shape)  # Depuração
        prediction = model.predict(input_array)

        if prediction[0] == 0:
            classe = 'developer, back-end'
        elif prediction[0] == 1:
            classe = 'developer, desktop'
        elif prediction[0] == 2:    
            classe = 'developer, front-end'
        elif prediction[0] == 3:
            classe = 'developer, mobile'
        return jsonify({'prediction': classe})
    except Exception as e:
        print("Erro no endpoint /predict:", str(e))  # Depuração
        return jsonify({'error': str(e)}), 400
    


if __name__ == '__main__':
    app.run(port=5000)