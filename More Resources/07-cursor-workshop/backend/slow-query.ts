import { Repository, In } from 'typeorm';

interface Task {
  id: number;
  userId: number;
  user?: User;
}

interface User {
  id: number;
}

async function getAllUsers(
  taskRepo: Repository<Task>,
  userRepo: Repository<User>,
) {
  const tasks = await taskRepo.find();
  const userIds = tasks.map((t) => t.userId);
  const users = await userRepo.find({
    where: {
      id: In(userIds),
    },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));

  for (const task of tasks) {
    task.user = userMap.get(task.userId);
  }

  return tasks;
}