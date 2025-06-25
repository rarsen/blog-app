import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return {
      message: 'Post created successfully',
      data: post,
    };
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return {
      message: 'Posts retrieved successfully',
      data: posts,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);
    return {
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, updatePostDto);
    return {
      message: 'Post updated successfully',
      data: post,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.remove(id);
    return {
      message: 'Post deleted successfully',
    };
  }
} 