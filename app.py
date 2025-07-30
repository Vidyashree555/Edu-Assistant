from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sys
import os

# Add the AI chatbot directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'AI chatbot'))

# Import the chatbot functionality
import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model

app = Flask(__name__, template_folder='.', static_folder='.')
CORS(app)

# Initialize chatbot components
lemmatizer = WordNetLemmatizer()

# Load chatbot data
try:
    with open('AI chatbot/intents.json', 'r') as file:
        intents = json.load(file)
    
    words = pickle.load(open('AI chatbot/words.pkl', 'rb'))
    classes = pickle.load(open('AI chatbot/classes.pkl', 'rb'))
    model = load_model('AI chatbot/chatbotmodel.h5')
    print("Chatbot model loaded successfully!")
except Exception as e:
    print(f"Error loading chatbot model: {e}")
    intents = None
    words = None
    classes = None
    model = None

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    if not model or not words or not classes:
        return [{'intent': 'invalid', 'probability': '1.0'}]
    
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    
    if not return_list:
        return [{'intent': 'invalid', 'probability': '1.0'}]
    
    return return_list

def get_response(intents_list, intents_json):
    if not intents_json or not intents_list:
        return "Sorry, I'm having trouble understanding. Could you please rephrase your question?"
    
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            return result
    
    return "Sorry, I didn't understand that. Could you please ask something else about our college?"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({'response': 'Please enter a message.'})
        
        # Get chatbot response
        ints = predict_class(message)
        response = get_response(ints, intents)
        
        return jsonify({'response': response})
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'response': 'Sorry, I encountered an error. Please try again later.'})

@app.route('/health')
def health():
    status = {
        'status': 'healthy',
        'chatbot_loaded': model is not None,
        'intents_loaded': intents is not None
    }
    return jsonify(status)

if __name__ == '__main__':
    print("Starting College Chatbot Web Server...")
    print("Loading chatbot components...")
    
    # Download required NLTK data if not present
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('tokenizers/punkt_tab')
        nltk.data.find('corpora/wordnet')
    except LookupError:
        print("Downloading required NLTK data...")
        nltk.download('punkt')
        nltk.download('punkt_tab')
        nltk.download('wordnet')
    
    print("Server starting on http://localhost:5000")
    print("You can now open your web browser and visit the college website!")
    app.run(debug=True, host='0.0.0.0', port=5000)
