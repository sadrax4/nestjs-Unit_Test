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
}