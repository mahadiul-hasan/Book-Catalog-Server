"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = require("../../../shared/sendResponse");
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const book = req.body;
    const user = req.user;
    const result = yield book_service_1.BookService.CreateBook(book, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books Created successfully',
        data: result,
    });
}));
const getBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const result = yield book_service_1.BookService.GetBooks(filters);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        data: result,
    });
}));
const getReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewBookId = req.params.reviewBookId;
    const result = yield book_service_1.BookService.GetReview(reviewBookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review retrieved successfully',
        data: result,
    });
}));
const getBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBookId = req.params.getBookId;
    const result = yield book_service_1.BookService.GetBookById(getBookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const updateBookId = req.params.updateBookId;
    const user = req.user;
    const updatedData = req.body;
    const result = yield book_service_1.BookService.UpdateBook(updateBookId, user, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const deleteBookId = req.params.deleteBookId;
    const user = req.user;
    yield book_service_1.BookService.DeleteBook(deleteBookId, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
    });
}));
const addReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.body) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const id = req.params.id;
    const user = req.user;
    const reviewData = req.body;
    const result = yield book_service_1.BookService.AddReview(id, user, reviewData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Add Review successfully',
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    addReview,
    getReview,
};
