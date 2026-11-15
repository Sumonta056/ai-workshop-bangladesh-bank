import { Injectable } from '@nestjs/common';

/**
 * AppService
 * 
 * Core application service providing health check and system information endpoints.
 * Handles monitoring and status reporting for the Task Manager API.
 */
@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  async calculateUserMetrics(userId: string) {
    interface User { id: number; name: string; }
    interface Post { id: number; title: string; }

    // Fetch user data
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await userRes.json() as User;

    // Fetch user posts
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await postsRes.json() as Post[];

    // Calculate average title length
    // @ts-ignore
    const totalLength = posts.reduce((sum, p) => sum + p.titel.length, 0);
    
    return {
      user: user.name,
      postCount: posts.length,
      avgTitleLength: totalLength / posts.length
    };
  }
}
