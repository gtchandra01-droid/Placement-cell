const bcrypt = require('bcryptjs');

// Generate hash for password "admin123"
const password = 'admin123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Admin Login Credentials:');
console.log('========================');
console.log('Email: admin@jntuk.edu.in');
console.log('Password: admin123');
console.log('');
console.log('Hashed Password (for database):');
console.log(hash);
console.log('');
console.log('SQL Insert Statement:');
console.log(`INSERT INTO admins (name, email, password, role) VALUES ('Admin User', 'admin@jntuk.edu.in', '${hash}', 'admin');`);
