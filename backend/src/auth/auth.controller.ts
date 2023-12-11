import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PasswordDto } from "src/dto";
import { Jwt } from "src/types";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	signIn(@Body() passwordDto: PasswordDto): Promise<Jwt> {
		return this.authService.signIn(passwordDto.password);
	}
}
