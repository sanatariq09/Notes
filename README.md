ScribblyNote

ScribblyNote ek simple aur user-friendly note-taking application hai jisme users apne notes create, read, update aur delete (CRUD) kar sakte hain. Backend me Node.js, Express, MongoDB, Mongoose aur Passport.js use for authentication and data management.

Features

- User Authentication: Passport.js ke through secure login aur registration.
- CRUD Operations: Notes create, read, update, aur delete karne ki functionality.
- MongoDB: Notes aur user data store karne ke liye.
- RESTful API: Express routes ke through backend operations.
- Secure Routes: Users sirf apne notes access kar sakte hain.

Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js

Installation

git clone https://github.com/username/ScribblyNote.git
cd ScribblyNote
npm install

Create a ".env" file with:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

Start the server:

npm start

Server-Side Folder Structure

ScribblyNote/
├── app.js             # Main server file
├── config/
│   └── passport.js    # Passport.js configuration
├── models/
│   ├── User.js        # User schema
│   └── Note.js        # Note schema
├── routes/
│   ├── auth.js        # Authentication routes (login, register)
│   └── notes.js       # Notes CRUD routes
├── controllers/
│   ├── authController.js  # Logic for authentication
│   └── notesController.js # Logic for note operations
├── middleware/
│   └── auth.js        # Middleware to protect routes
├── views/             # Frontend templates (EJS or HTML)
└── package.json

Usage

1. Browser me "http://localhost:5000" open karein.
2. Register aur login karein.
3. Apne notes create, edit, view aur delete karein.

Contributing

Pull requests welcome. Major changes se pehle issue open karein.

License

"MIT" (LICENSE)
