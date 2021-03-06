import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/model/auth.entity';
import { User } from 'src/auth/model/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedEntity } from '../model/post.entity';
import { Feed } from '../model/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  getAll(): string {
    return 'This action returns all Feeds!';
  }
  findPosts(take = 10, skip = 0): Promise<Feed[]> {
    return this.feedRepository.find({ take, skip }).then((posts) => {
      return <Feed[]>posts;
    });
  }
  getOne(id): Promise<Feed> {
    return this.feedRepository.findOne(id);
  }
  createFeed(): string {
    return 'This action create a Feed!';
  }
  async createPost(user: User, feedPost: Feed): Promise<Feed> {
    const email = user.email;
    console.log('user', user);
    const user_id = await this.userRepository.findOne(
      { email },
      {
        select: ['id'],
      },
    );
    feedPost.author = user_id;
    return this.feedRepository.save(feedPost);
  }
  // findAllPosts(): Promise<Feed[]> {
  //   return this.feedRepository.find();
  // }
  updatePost(id: number, feedPost: Feed): Promise<UpdateResult> {
    return this.feedRepository.update(id, feedPost);
  }
  deletePost(id: number): Promise<DeleteResult> {
    return this.feedRepository.delete(id);
  }
}
