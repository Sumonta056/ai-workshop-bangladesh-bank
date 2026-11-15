import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../../config/database.config';
import { User } from '../../modules/users/entities/user.entity';
import { Task, TaskStatus, TaskPriority } from '../../modules/tasks/entities/task.entity';

async function seed() {
  let dataSource: DataSource | null = null;

  try {
    console.log('🌱 Starting database seed...');

    // Initialize database connection
    dataSource = await AppDataSource.initialize();
    console.log('✅ Database connection established');

    // Sync database schema (creates tables if they don't exist)
    await dataSource.synchronize();
    console.log('✅ Database schema synchronized');

    // Clear existing data (must delete in correct order due to foreign keys)
    const taskRepository = dataSource.getRepository(Task);
    const userRepository = dataSource.getRepository(User);

    const taskCount = await taskRepository.count();
    const userCount = await userRepository.count();

    if (taskCount > 0 || userCount > 0) {
      // Use raw query to truncate with CASCADE
      await dataSource.query('TRUNCATE TABLE "tasks", "users" RESTART IDENTITY CASCADE');
      console.log('🗑️  Cleared existing data');
    } else {
      console.log('ℹ️  No existing data to clear');
    }

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await userRepository.save([
      {
        email: 'john.doe@example.com',
        password: hashedPassword,
        name: 'John Doe',
        isActive: true,
      },
      {
        email: 'jane.smith@example.com',
        password: hashedPassword,
        name: 'Jane Smith',
        isActive: true,
      },
      {
        email: 'admin@workshop.local',
        password: hashedPassword,
        name: 'Workshop Admin',
        isActive: true,
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create tasks
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await taskRepository.save([
      // John's tasks
      {
        title: 'Setup development environment',
        description: 'Install Node.js, Docker, and all required tools',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        userId: users[0].id,
        dueDate: now,
      },
      {
        title: 'Learn TypeORM basics',
        description: 'Study entities, repositories, and migrations',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        userId: users[0].id,
        dueDate: tomorrow,
      },
      {
        title: 'Build authentication module',
        description: 'Implement JWT authentication with Passport',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        userId: users[0].id,
        dueDate: nextWeek,
      },
      {
        title: 'Write unit tests',
        description: 'Add test coverage for all modules',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        userId: users[0].id,
        dueDate: nextWeek,
      },
      // Jane's tasks
      {
        title: 'Design database schema',
        description: 'Create ERD for task management system',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        userId: users[1].id,
        dueDate: now,
      },
      {
        title: 'Setup Redis caching',
        description: 'Configure Redis and implement cache interceptor',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        userId: users[1].id,
        dueDate: tomorrow,
      },
      {
        title: 'Create API documentation',
        description: 'Write Swagger/OpenAPI specs for all endpoints',
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        userId: users[1].id,
        dueDate: nextWeek,
      },
      // Admin's tasks
      {
        title: 'Configure CI/CD pipeline',
        description: 'Setup GitHub Actions for automated testing and deployment',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        userId: users[2].id,
        dueDate: nextWeek,
      },
      {
        title: 'Monitor application performance',
        description: 'Setup logging and monitoring tools',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        userId: users[2].id,
        dueDate: nextWeek,
      },
    ]);

    console.log(`✅ Created ${tasks.length} tasks`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Tasks: ${tasks.length}`);
    console.log('\n🔐 Test Credentials:');
    console.log('   Email: john.doe@example.com');
    console.log('   Email: jane.smith@example.com');
    console.log('   Email: admin@workshop.local');
    console.log('   Password (all): password123\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      console.log('✅ Database connection closed');
    }
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('✅ Seed script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  });
