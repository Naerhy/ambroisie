import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Jwt } from "src/types";

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async signIn(password: string): Promise<Jwt> {
		const admin_password = this.configService.get<string>("ADMIN_PASSWORD");
		if (password !== admin_password) {
			throw new UnauthorizedException("Incorrect admin password");
		}
		const payload = { sub: "admin" };
		this.logger.log("Created new access token");
		return { accessToken: await this.jwtService.signAsync(payload) };
	}
}
