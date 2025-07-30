// Navigation Toggle for Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Chatbot Functionality
let isChatbotOpen = false;
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

// Chatbot responses based on the intents.json patterns
const chatbotResponses = {
    greetings: ["Hello!", "Hey!", "What can I do for you?"],
    name: ["You can call me Ribot", "I'm Ribot", "I'm Ribot your virtual assistant"],
    courses: ["Informatics College Pokhara has been in direct partnership with London Metropolitan University, UK to provide enviable higher education in IT and Business to students in Pokhara.\\n\\nFor Bachelors Degree in Information Technology we have been offering the specialization in BSc (Hons) Computing.\\n\\nFor Bachelors in Business Administration we have been offering the followings:\\n\\n1. BBA (Marketing) with International Business\\n\\n2. BBA (Accounting & Finance) with International Business\\n\\n3. BBA (International Business)"],
    courseDuration: ["Our college offers 3 year long BIT course and 3 and half year long BBA course."],
    location: ["Informatics College Pokhara is located in Matepani-12, pokhara near Gandaki Hospital."],
    semesters: ["There are two semesters in a year."],
    semDuration: ["The single semester will be around 4 months."],
    studentRequirements: ["Academic Level\\nNEB +2 overall aggregate of 2.2 CGPA (55%) or above with each subject (theory and practical) grade D+ or above, and SEE Mathematics score of C+ ( 50%) or above.\\nFor A-Levels, a minimum of 3.5 credits and atleast a grade of D and above.\\n\\nEnglish Proficiency\\nEnglish NEB XII Marks greater or equals to 60% or 2.4 GPA\\nFor Level 4 or Year 1 BIT\\nPass in General Paper or English Language or IELTS 5.5 or PTE 47/ Meeting UCAS Tariff points of 80.\\nFor Level 4 or Year 1 BBA\\nPass in General Paper or English Language or IELTS 5.5 or PTE 47/ Meeting UCAS Tariff points of 96."],
    classes: ["There may be two or three classes per day. Each class will be of 1 hour and 30 minutes."],
    teachingStyle: ["Our college has different teaching patterns than other colleges of Nepal. We adopt a British teaching methodology, following the LTW techniques which stands for Lecture, Tutorial and Workshop.\\nYou can provide us with your contact details and our counselors shall reach out to you and provide you with further details."],
    exams: ["There are assignments which carry more weight than your written exams. The assignments have deadlines which you should not exceed if you want to get better marks."],
    hours: ["You can message us here at any hours. But our college premises will be open from 7:00 am to 5:00 pm only."],
    funActivities: ["Yes, Of course. Our college not only provides excellent education but also encourage students to take part in different curriculum activities. The college conducts yearly programs like Sports meet, Carnival, Holi festival, and Christmas.\\n Also our college has basketball court, badminton court, table tennis, chess, carrom board and many more refreshment zones."],
    facilities: ["With excellent education facilities, Our College provides various other facilities like 24 hours internet, library, classes with AC, discusson room, canteen, parking space, and student service for any students queries."],
    fee: ["Course BIT\\nAdmission fee=RS 96,000\\nYear 1\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 69,000 Total fee= RS 334,000\\nYear 2\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 69,000 Total fee= RS 238,000\\nYear 3\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 69,000 Total fee= RS 238,000\\nGrandTotal fee= RS 810,000\\n\\nCourse BBA\\nAdmission fee=RS 96,000\\nYear 1\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 52,000 Total fee= RS 300,000\\nYear 2\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 52,000 Total fee= RS 204,000\\nYear 3\\nUniversity and Exam fee= RS 100,000 Each semester fee=RS 52,000 Total fee= RS 204,000\\nYear 4\\nUniversity and Exam fee= RS 50,000 Semester fee=RS 52,000 Total fee= RS 102,000\\nGrandTotal fee= RS 810,000"],
    goodbye: ["Sad to see you go :(", "Talk you later", "Goodbye"],
    thanks: ["Happy to help!", "Any time!", "My pleasure"],
    invalid: ["Sorry, can't understand you", "Please give me more info", "Not sure I understand"]
};

// Keywords mapping for intent recognition
const intentKeywords = {
    greetings: ['hello', 'hey', 'hi', 'good day', 'greetings', 'what\'s up', 'how is it going'],
    name: ['what is your name', 'name', 'what\'s your name', 'who are you', 'what should i call you'],
    courses: ['what courses are available', 'courses', 'programs', 'degrees', 'what can i study'],
    courseDuration: ['how long', 'duration', 'course duration', 'how many years', 'time to complete'],
    location: ['location', 'where is it located', 'address', 'where is the college'],
    semesters: ['how many semesters', 'semesters in a year', 'semesters per year'],
    semDuration: ['semester duration', 'how long is a semester', 'months in semester'],
    studentRequirements: ['admission requirements', 'entry requirements', 'requirements', 'eligibility'],
    classes: ['classes per day', 'class duration', 'how long are classes', 'daily classes'],
    teachingStyle: ['teaching style', 'teaching pattern', 'teaching methodology', 'how do you teach'],
    exams: ['exams', 'exam pattern', 'examinations', 'tests', 'assessments'],
    hours: ['hours', 'timings', 'when are you open', 'working hours'],
    funActivities: ['activities', 'extra curriculum', 'fun programs', 'sports', 'events'],
    facilities: ['facilities', 'infrastructure', 'amenities', 'what facilities'],
    fee: ['fee', 'fees', 'cost', 'price', 'tuition', 'how much'],
    goodbye: ['bye', 'goodbye', 'see you later', 'see ya', 'leaving'],
    thanks: ['thanks', 'thank you', 'helpful', 'awesome thanks']
};

function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
        chatbotContainer.classList.add('active');
        chatbotInput.focus();
    } else {
        chatbotContainer.classList.remove('active');
    }
}

function openChatbot() {
    isChatbotOpen = true;
    chatbotContainer.classList.add('active');
    chatbotInput.focus();
}

function closeChatbot() {
    isChatbotOpen = false;
    chatbotContainer.classList.remove('active');
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = content.replace(/\\n/g, '<br>');
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-content typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
}

function removeTypingIndicator(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
        typingDiv.parentNode.removeChild(typingDiv);
    }
}

function recognizeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
        for (const keyword of keywords) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                return intent;
            }
        }
    }
    
    return 'invalid';
}

async function getChatbotResponse(message) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error getting chatbot response:', error);
        // Fallback to local response
        const intent = recognizeIntent(message);
        const responses = chatbotResponses[intent] || chatbotResponses.invalid;
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

async function sendChatbotMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Show typing indicator
    const typingDiv = showTypingIndicator();
    
    try {
        // Get bot response from server
        const response = await getChatbotResponse(message);
        
        removeTypingIndicator(typingDiv);
        addMessage(response);
        
        // Handle goodbye
        if (recognizeIntent(message) === 'goodbye') {
            setTimeout(() => {
                closeChatbot();
            }, 2000);
        }
    } catch (error) {
        removeTypingIndicator(typingDiv);
        addMessage("Sorry, I'm having some technical difficulties. Please try again later.");
    }
}

function handleChatbotInput(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

// Contact Form Handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name') || this.querySelector('input[type="text"]').value;
    const email = formData.get('email') || this.querySelector('input[type="email"]').value;
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .facility-card, .contact-item, .about-text, .about-image');
    animateElements.forEach(el => observer.observe(el));
});

// Chatbot Auto-Open on Page Load (Optional)
window.addEventListener('load', () => {
    // Auto-open chatbot after 3 seconds (optional)
    // setTimeout(() => {
    //     if (!isChatbotOpen) {
    //         openChatbot();
    //         addMessage("Hi! I noticed you're new here. I'm Ribot, your virtual assistant. Feel free to ask me anything about our college!");
    //     }
    // }, 3000);
});

// Prevent form submission reload
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const inputs = this.querySelectorAll('input, textarea');
            let formData = {};
            inputs.forEach(input => {
                if (input.value.trim()) {
                    formData[input.type] = input.value;
                }
            });
            
            // Show success message
            const name = this.querySelector('input[type="text"]').value;
            alert(`Thank you ${name}! Your message has been received. We'll contact you soon.`);
            
            // Reset form
            this.reset();
        });
    }
});
