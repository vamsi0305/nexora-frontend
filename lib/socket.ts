import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    // We connect to /ws based on backend route mounting or root
    // The backend uses Socket.io ASGIApp which typically runs on root with /socket.io/ path by default
    socket = io(API_URL, {
      path: "/ws/socket.io",
      autoConnect: false,
    });
  }
  return socket;
};
