import { DeleteOptions, UpdateFilter } from "mongodb";
import mongoose, { Aggregate, AggregateOptions, Document, FilterQuery, Model, PipelineStage, PopulateOptions, ProjectionType, QueryOptions, Types, UpdateQuery } from "mongoose";
import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    constructor(
        protected readonly entityModel: Model<TDocument>,
    ) { };

    async create(
        document: Omit<TDocument, "_id">,
    ): Promise<TDocument> {
        const entity = new this.entityModel({
            _id: new Types.ObjectId(),
            ...document
        });
        return ((await entity.save()).toJSON()) as unknown as TDocument
    }

    async findOne(
        filterQuery: FilterQuery<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions<TDocument>
    ) {
        const document = this.entityModel.findOne(
            filterQuery,
            projection,
            options
        ).lean(true).exec();
        if (!document) {
            throw new NotFoundException("no documents found")
        }
        return document
    }

    async findByIdAndUpdate(
        id: mongoose.ObjectId | string,
        update?: UpdateQuery<TDocument>,
        options?: QueryOptions<TDocument>
    ) {
        const document = this.entityModel.findByIdAndUpdate(
            id,
            update,
            options
        ).lean(true).exec();
        if (!document) {
            throw new NotFoundException("no documents found")
        }
        return document;
    }

    async find(
        entityFilterQuery: FilterQuery<TDocument>,
        projection?: ProjectionType<TDocument>,
        options?: QueryOptions<TDocument>
    ) {
        const documents = this.entityModel.find(
            entityFilterQuery,
            projection,
            options
        ).lean(true).exec();
        if (!documents) {
            throw new NotFoundException("no documents found")
        }
        return documents
    }

    async findById(
        id: mongoose.ObjectId | string,
        projection?: Record<string, Document>,
        options?: QueryOptions<TDocument>
    ) {
        const document = await this.entityModel.findById(
            id,
            { _id: 0, __v: 0, ...projection },
            options
        ).exec();
        if (!document) {
            throw new NotFoundException("no documents found")
        }
        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        updateQueryData: FilterQuery<TDocument>
    ) {
        const document = this.entityModel.findOneAndUpdate(
            filterQuery,
            updateQueryData
        ).exec();
        if (!document) {
            throw new NotFoundException("no documents found")
        }
        return document;
    }

    async updateMany(
        filterQuery: FilterQuery<TDocument>,
        updateQueryData: FilterQuery<TDocument>
    ) {
        const document = this.entityModel.updateMany(
            filterQuery,
            updateQueryData
        ).exec();
        if (!document) {
            throw new NotFoundException("no documents found")
        }
        return document;
    }

    async deleteMany(
        filterQuery: FilterQuery<TDocument>,
        options?: DeleteOptions
    ): Promise<Boolean> {
        const deleteResult = await this.entityModel.deleteMany(filterQuery);
        return deleteResult.deletedCount >= 1
    }

    async deleteOne(
        filterQuery: FilterQuery<TDocument>
    ): Promise<Boolean> {
        const deleteResult = await this.entityModel.deleteOne(filterQuery);
        return deleteResult.deletedCount >= 1;
    }

    async populate(
        docs: Array<any>,
        options: PopulateOptions | Array<PopulateOptions>
    ): Promise<Array<TDocument>> {
        return this.entityModel.populate(docs, options);
    }

    aggregate<R = any>(
        pipeline: PipelineStage[],
        options?: AggregateOptions,
    ): Aggregate<Array<R>> {
        return this.entityModel.aggregate(pipeline, options)
    }

}