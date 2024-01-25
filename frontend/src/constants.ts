import axios from "axios";

const { VITE_SERVER_IP: ip, VITE_SERVER_PORT: port } = import.meta.env;
export const requestsBaseUrl = `http://${ip}:${port}/api`;

export const types = ["petit-déjeuner", "déjeuner", "goûter", "dîner"];
export const difficulties = ["Facile", "Moyenne", "Difficile"];
export const cookingTimes = ["0-10 minutes", "10-30 minutes", "30-60 minutes", "Plus d'une heure"];

export function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getErrorMessage(error: unknown): string {
	if (axios.isAxiosError(error)) {
		return error.response?.data.message ?? `axios: ${error.message}`;
	} else if (error instanceof Error) {
		return error.message;
	} else {
		return "unexpected error";
	}
}
