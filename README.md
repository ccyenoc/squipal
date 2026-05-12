# 🧠 Squipal — AI Diary Companion

## 📖 Introduction

Squipal is a mobile diary application enhanced with an AI-powered chatbot designed to support users emotionally and conversationally. Users can write and store personal diary entries while interacting with “Squipal AI”, a friendly digital companion that responds in a fun, supportive, and engaging way.

The goal of Squipal is to combine journaling with conversational AI to create a more interactive and comforting user experience.

---

## ✨ Features

* 📝 Create and store diary entries
* 🤖 AI chatbot (Squipal) for casual and supportive conversations
* 💬 Real-time chat interaction with AI
* 📱 Clean and intuitive mobile UI
* ☁️ Backend integration with database storage

---

## 🛠️ Tech Stack

### Frontend

* React Native (Expo)
* TypeScript
* React Hooks (useState, useEffect)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### AI Integration

* Google Gemini API (Gemini 2.5 Flash)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ccyenoc/squipal.git
cd squipal
```

---

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Environment variables

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection
GEMINI_API_KEY=your_api_key
```

---

### 4. Run the app

#### Start backend

```bash
node server.js
```

#### Start frontend

```bash
npx expo start
```

---

## 📌 Future Improvements

* Chat history persistence
* Emotion analysis from diary entries
* Push notifications & reminders
* Improved chat UI (typing indicator, auto-scroll)

---

## 👨‍💻 Author

Built by [ccyenoc](https://github.com/ccyenoc)
rd community](https://chat.expo.dev): Chat with Expo users and ask questions.
