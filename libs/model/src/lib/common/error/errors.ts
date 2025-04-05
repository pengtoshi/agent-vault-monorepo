/* eslint-disable max-classes-per-file */
import { GraphQLError } from "graphql/error";

// 401
export class TokenExpiredError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "TOKEN_EXPIRED_ERROR",
      },
    });
    Object.defineProperty(this, "name", { value: "TokenExpiredError" });
  }
}

// 401
export class UnauthorizedError extends GraphQLError {
  constructor(message?: string) {
    super(message || "error.unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }
}

// 403
export class ForbiddenError extends GraphQLError {
  constructor(message?: string) {
    super(message || "error.forbidden", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
}

// 404
export class NotFoundError extends GraphQLError {
  constructor(message?: string) {
    super(message || "error.not_found", {
      extensions: {
        code: "RESOURCE_NOT_FOUND",
      },
    });
  }
}

// 500
export class InternalServerError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
}
