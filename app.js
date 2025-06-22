
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Enhanced chatbot logic with Logical Agents support
app.post('/chat', (req, res) => {
    const message = req.body.message.toLowerCase().trim();
    let response;

    const responses = {
        greeting: ["hi", "hello", "hey"],
        register: ["register", "sign up", "admission"],
        courses: ["courses", "programs", "subjects"],
        contact: ["contact", "email", "phone"],
        library: ["library", "books", "study"],
        help: ["help", "support", "assistance"],
        logical_agents: ["logical agents", "logic", "propositional", "first-order", "inference", "knowledge representation"]
    };

    if (responses.greeting.some(word => message.includes(word))) {
        response = "Hello! I'm your academic assistant. How can I help you today?";
    } else if (responses.register.some(word => message.includes(word))) {
        response = "You can register by visiting our registration portal at /register. The deadline for fall admission is August 15th.";
    } else if (responses.courses.some(word => message.includes(word))) {
        response = "We offer undergraduate and graduate programs in Computer Science, Business Administration, and Liberal Arts. Visit /courses for details.";
    } else if (responses.contact.some(word => message.includes(word))) {
        response = "You can contact us at:\n- Email: info@university.edu\n- Phone: (123) 456-7890\n- Office hours: Mon-Fri 9AM-5PM";
    } else if (responses.library.some(word => message.includes(word))) {
        response = "The university library is open:\n- Weekdays: 8AM-10PM\n- Weekends: 10AM-6PM\nYou can access our online catalog at /library";
    } else if (responses.help.some(word => message.includes(word))) {
        response = "I can help with information about registration, courses, library hours, and AI topics like Logical Agents. What would you like to know?";
    } else if (responses.logical_agents.some(word => message.includes(word))) {
        if (message.includes("propositional")) {
            response = "Propositional logic, as covered in Chapter 7 of *AI: A Modern Approach* (4th Ed.), uses propositions (true/false statements) and logical connectives (AND, OR, NOT, IMPLIES) to represent knowledge. Example: 'P ∧ Q' means P and Q are both true. Would you like an example of inference rules?";
        } else if (message.includes("first-order")) {
            response = "First-order logic, introduced in Chapter 8, extends propositional logic with predicates, variables, and quantifiers (∀, ∃). Example: ∀x (Human(x) → Mortal(x)) means all humans are mortal. Ask about resolution or unification for more details!";
        } else if (message.includes("inference")) {
            response = "Inference in logical agents involves deriving new facts from known ones using rules like modus ponens (from A → B and A, infer B) or resolution. In *AI: A Modern Approach*, Chapter 9 discusses these methods. Want an example?";
        } else if (message.includes("knowledge representation")) {
            response = "Knowledge representation, covered in Chapter 7-9, structures facts using logic. Logical agents use it to reason. For instance, representing 'All birds can fly' as ∀x (Bird(x) → CanFly(x)). Need help with a specific example?";
        } else {
            response = "Logical agents use logic to represent and reason about knowledge, as detailed in Chapters 7-9 of *AI: A Modern Approach* (4th Ed.). Ask about propositional logic, first-order logic, inference, or knowledge representation for specifics!";
        }
    } else {
        response = "I'm not sure I understand. Try asking about registration, courses, library hours, or AI topics like Logical Agents. Type 'help' for more options.";
    }

    res.json({ response });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});