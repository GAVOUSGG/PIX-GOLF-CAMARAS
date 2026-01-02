import { sequelize, User, initDb } from './db.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
  try {
    await initDb();

    // Check if users exist
    const usersCount = await User.count();
    if (usersCount > 0) {
      console.log('Users already exist. Clearing existing users to reset passwords...');
      await User.destroy({ where: {}, truncate: true });
    }

    const adminPassword = await bcrypt.hash('adminpassword123', 10);
    const userPassword = await bcrypt.hash('userpassword123', 10);

    const users = [
      {
        id: '1',
        username: 'admin',
        password: adminPassword,
        role: 'admin',
        lastLogin: null
      },
      {
        id: '2',
        username: 'user',
        password: userPassword,
        role: 'user',
        lastLogin: null
      }
    ];

    await User.bulkCreate(users);
    console.log('Users seeded successfully with secure passwords');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
