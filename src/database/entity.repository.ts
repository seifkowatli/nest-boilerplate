import { BadRequestException } from '@nestjs/common';
import {
  AggregateOptions,
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery, {
      ...projection,
    });
  }

  async count(entityFilterQuery: FilterQuery<T>): Promise<number> {
    return await this.entityModel.countDocuments(entityFilterQuery).exec();
  }

  async aggregate(
    aggregateStages: PipelineStage[],
    aggregateOptions?: AggregateOptions,
  ): Promise<T[] | null> {
    return await this.entityModel.aggregate(aggregateStages, aggregateOptions);
  }

  async create(createEntityDto: unknown): Promise<any> {
    const entity = new this.entityModel(createEntityDto);
    try {
      return await entity.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityDto: UpdateQuery<unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.entityModel.findOneAndUpdate(
        entityFilterQuery,
        updateEntityDto,
        { new: true, runValidators: true, projection: { ...projection } },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addSubDocument(
    entityFilterQuery: FilterQuery<T>,
    updateEntityDto: UpdateQuery<unknown>,
    projection?: Record<string, unknown>,
  ) {
    try {
      return await this.entityModel.findOneAndUpdate(
        entityFilterQuery,
        { $addToSet : updateEntityDto },
        { new: true, runValidators: true, projection: { ...projection } },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findDistinct(field: string): Promise<any[]> {
    return await this.entityModel.distinct(field).exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<number> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);

    //TODO : check if this exception is needed
    // if (!deleteResult.deletedCount) throw new BadRequestException('No document found to delete');

    return deleteResult.deletedCount;
  }
}
