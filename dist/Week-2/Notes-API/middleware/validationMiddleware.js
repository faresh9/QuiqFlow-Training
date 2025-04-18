import { AppError } from './errorMiddleware.js';
export const validateNoteInput = (req, _res, next) => {
    const { title, content } = req.body;
    const errors = [];
    if (!title) {
        errors.push('Title is required');
    }
    else if (typeof title !== 'string') {
        errors.push('Title must be a string');
    }
    else if (title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
    }
    if (!content) {
        errors.push('Content is required');
    }
    else if (typeof content !== 'string') {
        errors.push('Content must be a string');
    }
    else if (content.trim().length < 10) {
        errors.push('Content must be at least 10 characters long');
    }
    if (errors.length > 0) {
        next(new AppError(errors.join('. '), 400));
        return;
    }
    next();
};
//# sourceMappingURL=validationMiddleware.js.map