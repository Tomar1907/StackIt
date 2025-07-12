# StackIt

# 🧠 Stackit – A Minimal Q&A Forum Platform

StackIt is a minimal question-and-answer platform designed to support collaborative learning and structured knowledge sharing. It's user-friendly, focused on simplicity, and inspired by the core experience of asking and answering questions in a community-driven environment.

---

## Email and names- 
- Aparmit Srivastava - aparmitsrivastava1@gmail.com
- Shubhankar Chauhan - shubhankarchauhan09@gmail.com
- Soumya Tomar - soumyatomar31@gmail.com
- Utkarsh Kumar Sinha - utkarshkumarsinha018@gmail.com

## 🚀 Features

### ✅ Core Functionality (Must-Have)

#### 1. Ask Questions
Users can submit a new question with:
- 📝 **Title** – Short and descriptive
- 🧾 **Description** – Rich text input using an advanced editor
- 🏷️ **Tags** – Multi-select tag input (React, JWT, etc.)

#### 2. Rich Text Editor Features
The description editor supports:
- Bold, Italic, Strikethrough
- Ordered lists and Bullet points
- Emoji insertion
- Hyperlinks (URLs)
- Image uploads
- Text alignment (Left, Center, Right)

#### 3. Answering Questions
- Users can post answers to any question
- Answer editor is also a rich text input
- Only logged-in users can post answers

#### 4. Voting & Accepting Answers
- Users can upvote or downvote answers
- Question authors can mark one answer as **accepted**

#### 5. Tagging
- Questions must include relevant tags
- Used for search and filtering

#### 6. Notification System
- 🔔 Notification icon in top navigation
- Users get notified when:
  - Someone answers their question
  - Someone comments on their answer
  - Someone mentions them (`@username`)
- Dropdown with recent notifications
- Unread count shown on the icon

---

## 👤 User Roles

| Role   | Permissions |
|--------|-------------|
| Guest  | View all questions and answers |
| User   | Register, log in, post Q&A, vote |
| Admin  | Moderate content |

Authentication and role-based access control is handled by **[Clerk](https://clerk.com)**.

---

## 🧱 Tech Stack

### Frontend
- Next.js
- TailwindCSS
- React Router
- ShadCN ui
- TinyMCE (Rich Text Editor)
- Clerk (Authentication)
- Axios (API requests)
- React Select (for tags)

### Backend
- Node.js + Express
- MySQL
- Socket.io (for real-time notifications)
- Clerk Webhooks (for user role metadata)
- PrismaORM

---



