from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = "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"  # ⚠️ À cacher si déploiement
@app.route('/api/Chatbot/ask', methods=['POST'])
def chatbot_ask():
    try:
        data = request.get_json(force=True)
        message = data.get("value", "")
        print(f"Message reçu : {message}")

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "mistralai/mistral-small-3.2-24b-instruct:free",  # ou un autre modèle disponible
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)

        response.raise_for_status()

        ai_reply = response.json()["choices"][0]["message"]["content"]

        return jsonify({
            "sender": "bot",
            "value": ai_reply
        })

    except Exception as e:
        print("Erreur dans l'API OpenRouter :", e)
        print("Réponse brute OpenRouter :", response.text if 'response' in locals() else 'Pas de réponse')
        return jsonify({
            "sender": "bot",
            "value": "Une erreur est survenue côté serveur."
        }), 500

    ai_reply = response.json()["choices"][0]["message"]["content"]

    return jsonify({
        "sender": "bot",
        "value": ai_reply
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
