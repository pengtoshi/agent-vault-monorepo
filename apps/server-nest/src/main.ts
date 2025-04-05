/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { extractAllErrors } from "@libs/nestjs-core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const messages = validationErrors.map((error) => {
          return extractAllErrors(error);
        });
        return new GraphQLError(messages.join(""));
      },
    }),
  ); // dto validation

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
