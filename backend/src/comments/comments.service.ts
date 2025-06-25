import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async create(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    // Verify that the post exists
    await this.postsService.findOne(postId);
    
    const comment = this.commentRepository.create({
      ...createCommentDto,
      postId,
    });
    
    return await this.commentRepository.save(comment);
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { postId },
      order: {
        createdAt: 'ASC',
      },
    });
  }
} 