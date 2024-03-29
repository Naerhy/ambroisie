import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { json } from "express";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.use(json({ limit: "600kb" }));
	await app.listen(app.get(ConfigService).get<number>("BACKEND_PORT")!);
}

bootstrap();
