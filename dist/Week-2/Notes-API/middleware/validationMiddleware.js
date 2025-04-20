import { AppError } from './errorMiddleware.js';
import config from '../config/env.js';
export const validateTitle = (title) => {
    if (!title) {
        throw AppError.validation('Title is required');
    }
    if (typeof title !== 'string') {
        throw AppError.validation('Title must be a string');
    }
    if (title.trim().length < config.validation.minTitleLength) {
        throw AppError.validation(`Title must be at least ${config.validation.minTitleLength} characters long`);
    }
};
export const validateContent = (content) => {
    if (!content) {
        throw AppError.validation('Content is required');
    }
    if (typeof content !== 'string') {
        throw AppError.validation('Content must be a string');
    }
    if (content.trim().length < config.validation.minContentLength) {
        throw AppError.validation(`Content must be at least ${config.validation.minContentLength} characters long`);
    }
};
export const validateNoteInput = (req, _res, next) => {
    try {
        const { title, content } = req.body;
        validateTitle(title);
        validateContent(content);
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=validationMiddleware.js.map