import {
  ComprehendClient,
  DetectEntitiesCommand,
  DetectEntitiesCommandOutput,
  DetectSentimentCommand,
  DetectSentimentCommandOutput,
} from "@aws-sdk/client-comprehend";
import { Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../users/entities/user.entity";

import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  private readonly client = new ComprehendClient({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const comment = await this.commentsRepository.save({
      ...createCommentDto,
      user,
    });

    this.schedulerRegistry.addTimeout(
      `comment-${comment.id}`,
      this.analyzeComment(comment),
    );

    return this.commentsRepository.findOne(comment.id);
  }

  async analyzeComment(comment: Comment) {
    const input = {
      Text: comment.body,
      LanguageCode: "ko",
    };

    const commands = [DetectSentimentCommand, DetectEntitiesCommand].map(
      (Command) => new Command(input),
    ) as [DetectSentimentCommand, DetectEntitiesCommand];

    return setTimeout(async () => {
      this.logger.log(`Analyzing comment ${comment.id}`);

      const [{ Sentiment, SentimentScore }, { Entities }] = (await Promise.all(
        commands.map((command) => this.client.send(command as any)),
      )) as [DetectSentimentCommandOutput, DetectEntitiesCommandOutput];

      comment.detectedSentimentScore = JSON.stringify(SentimentScore);
      comment.detectedSentiment = Sentiment;
      comment.confirmedSentiment = Sentiment;

      comment.detectedEntities = JSON.stringify(Entities);
      comment.confirmedEntities = Entities.map(({ Text }) => Text).toString();

      this.commentsRepository.save(comment);
    }, 100);
  }

  async findAll() {
    return this.commentsRepository.find();
  }

  async findOne(id: number) {
    return this.commentsRepository.findOne(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return this.commentsRepository.delete(id);
  }
}
