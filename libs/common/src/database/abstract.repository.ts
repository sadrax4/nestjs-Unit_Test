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

}