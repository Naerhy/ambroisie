const { VITE_SERVER_IP: ip, VITE_SERVER_PORT: port } = import.meta.env;

export const requestsUrl = `http://${ip}:${port}/api/recipes`;
