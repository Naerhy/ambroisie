import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Jwt } from "src/types";

@Injectable()
export class AuthService {
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
		return { accessToken: await this.jwtService.signAsync(payload) };
	}
}
