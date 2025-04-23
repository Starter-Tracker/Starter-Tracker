# python/model_service.py
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

def preprocess_data(input_json):
    df = pd.DataFrame([input_json])  # transforma o JSON em DataFrame

    # Colunas com LabelEncoder
    colunas_label = ['DevType']  # você pode expandir essa lista se necessário

    # Colunas com MultiLabelBinarizer
    colunas_multilabel = [
        'LanguageHaveWorkedWith','WebframeHaveWorkedWith','DatabaseHaveWorkedWith','PlatformHaveWorkedWith',
        'ToolsTechHaveWorkedWith','LanguageWantToWorkWith','WebframeWantToWorkWith','DatabaseWantToWorkWith',
        'PlatformWantToWorkWith','ToolsTechWantToWorkWith','Employment'
    ]

    # Tratamento de string para minúsculo e separação
    for col in df.columns:
        if col in colunas_multilabel:
            df[col] = df[col].fillna('').astype(str).str.lower().str.split(';')
        elif col in colunas_label:
            df[col] = df[col].fillna('').astype(str).str.lower()


    # Aplica MultiLabelBinarizer
    for col in colunas_multilabel:
        if col in df:
            mlb = mlb_encoders[col]
            df_encoded = pd.DataFrame(
                mlb.transform(df[col]),
                columns=[f'{col}_{cls}' for cls in mlb.classes_],
                index=df.index
            )
            df = pd.concat([df.drop(columns=[col]), df_encoded], axis=1)

    return df




# Carrega o modelo
with open('modelo/RandomFlorest.sav', 'rb') as f:
    model = pickle.load(f)

with open('modelo/label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

with open('modelo/multi_label_binarizers.pkl', 'rb') as f:
    mlb_encoders = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']  # espera uma lista com os dados
    processed_df = preprocess_data(data)
    prediction = model.predict(processed_df.to_numpy().reshape(1, -1))
    
    if prediction[0] == 0:
        classe = ' developer, back-end '
    elif prediction[0] == 1:
        classe = ' developer, desktop '
    elif prediction[0] == 2:    
        classe = ' developer, front-end '
    elif prediction[0] == 3:
        classe = ' developer, mobile '
    return jsonify({'prediction': classe})

if __name__ == '__main__':
    app.run(port=5000)
