import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(req);
		if (!token) {
			throw new UnauthorizedException("No jwt attached to request");
		}
		try {
			await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>("JWT_SECRET")
			});
		} catch {
			throw new UnauthorizedException("Invalid jwt");
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
