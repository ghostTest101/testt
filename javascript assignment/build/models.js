"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
});
exports.Book = (0, mongoose_1.model)('Book', BookSchema);
