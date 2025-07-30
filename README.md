# College Chatbot Website

A complete college website with an integrated AI chatbot for Informatics College Pokhara. The website features a modern design with information about courses, facilities, and an interactive chatbot (Ribot) that can answer questions about the college.

## 🚀 Features

### Website Features
- **Modern Responsive Design** - Works on desktop, tablet, and mobile
- **College Information** - Comprehensive details about courses, facilities, and admission
- **Interactive Sections** - About, Courses, Facilities, Contact
- **Smooth Animations** - Professional animations and transitions
- **Contact Form** - Get in touch functionality

### Chatbot Features
- **AI-Powered Responses** - Uses trained TensorFlow/Keras model
- **Natural Language Processing** - Understands various question formats
- **College-Specific Knowledge** - Answers questions about:
  - Courses and programs
  - Fees and admission requirements
  - College facilities and infrastructure
  - Location and timings
  - Teaching methodology
  - Extra-curricular activities

## 📁 Project Structure

```
collage-chatbot/
├── index.html              # Main website homepage
├── css/
│   └── style.css           # Website styling
├── js/
│   └── script.js           # Website interactions & chatbot integration
├── app.py                  # Flask web server
├── run_website.bat         # Easy launcher for the website
├── run_chatbot.bat         # Console-only chatbot launcher
├── AI chatbot/
│   ├── main.py             # Original console chatbot
│   ├── trainingData.py     # Model training script
│   ├── intents.json        # Chatbot training data
│   ├── chatbotmodel.h5     # Trained AI model
│   ├── words.pkl           # Processed vocabulary
│   └── classes.pkl         # Intent classifications
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.7+
- Web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd collage-chatbot
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   pip install tensorflow nltk numpy flask flask-cors
   ```

3. **Run the website** (Easiest method)
   - Double-click `run_website.bat`
   - The website will open automatically in your browser at `http://localhost:5000`

## 🎯 How to Run

### Method 1: Website with Integrated Chatbot (Recommended)
```bash
# Double-click run_website.bat OR run manually:
python app.py
# Then open http://localhost:5000 in your browser
```

### Method 2: Console Chatbot Only
```bash
# Double-click run_chatbot.bat OR run manually:
cd "AI chatbot"
python main.py
```

### Method 3: Manual Flask Server
```bash
python app.py
```

## 💬 Using the Chatbot

### On the Website
1. Click the floating chat icon in the bottom-right corner
2. Type your questions about the college
3. Get instant AI-powered responses

### Sample Questions to Ask Ribot:
- "Hello" or "Hi"
- "What courses are available?"
- "What is the fee structure?"
- "Where is the college located?"
- "What are the admission requirements?"
- "What facilities do you provide?"
- "How long are the courses?"
- "What is your teaching methodology?"

## 🎨 Website Sections

### 1. Hero Section
- Welcome message and college introduction
- Quick access to courses and chatbot
- Attractive visual design

### 2. About Section
- College information and partnership details
- Key statistics (course duration, semesters, etc.)
- Teaching methodology information

### 3. Courses Section
- **BSc (Hons) Computing** - 3-year IT program
- **BBA Programs** - Marketing, Accounting & Finance, International Business
- Detailed course information and fees

### 4. Facilities Section
- 24-hour internet
- Library and study spaces
- AC classrooms
- Sports facilities
- Canteen and parking

### 5. Contact Section
- College location and timing
- Contact form
- Address and contact details

## 🤖 Chatbot Technical Details

### AI Model
- **Framework**: TensorFlow/Keras
- **Type**: Neural Network with Dense layers
- **Training**: Based on college-specific intents and patterns
- **NLP**: Uses NLTK for text processing

### Supported Intents
- Greetings and introductions
- Course information
- Fee inquiries
- Admission requirements
- College facilities
- Location and timings
- Teaching methodology
- Activities and events

## 🔧 Customization

### Adding New Chatbot Responses
1. Edit `AI chatbot/intents.json`
2. Add new patterns and responses
3. Run `trainingData.py` to retrain the model
4. Restart the web server

### Modifying Website Content
1. Edit `index.html` for content changes
2. Modify `css/style.css` for styling
3. Update `js/script.js` for functionality

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern web browsers

## 🚀 Deployment

For production deployment:
1. Use a production WSGI server like Gunicorn
2. Set up a reverse proxy with Nginx
3. Use environment variables for configuration
4. Enable HTTPS

## 🆘 Troubleshooting

### Common Issues

1. **Chatbot not responding**
   - Check if Flask server is running
   - Verify model files are present
   - Check browser console for errors

2. **Website not loading**
   - Ensure Flask server is running on port 5000
   - Check for firewall blocking localhost
   - Try different browser

3. **Model loading errors**
   - Verify all `.pkl` and `.h5` files exist
   - Reinstall TensorFlow: `pip install tensorflow`
   - Check Python version compatibility

### Dependencies Issues
```bash
# Reinstall all dependencies
pip install --upgrade tensorflow nltk numpy flask flask-cors

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab'); nltk.download('wordnet')"
```

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review the console output for error messages
- Ensure all dependencies are properly installed

## 🎯 Future Enhancements

Potential improvements:
- Database integration for storing conversations
- User authentication system
- Advanced analytics dashboard
- Multi-language support
- Voice chat capabilities
- Integration with college management system

---

**Created by**: @swapniltake1  
**Project**: AI College Chatbot Website  
**Institution**: Informatics College Pokhara
Ai Based Project. This bot is used for automatic reply for college website. This is my 3rd year 6th sem project for AI Subject.
language used in this project is python.
for running import lyb in your system. 
for any help contact me on 
linkedIn - @swapniltake1
instagram - @swapniltake_patil  / @computer_science_engineers__
