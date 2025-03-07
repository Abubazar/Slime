import { handleRoom, handleUsername } from "./utils"

const user = {
	room: "",
	username: "",
}

export type User = typeof user

const server = Bun.serve<User>({
	fetch(req, server) {
		if (server.upgrade(req, { data: { ...user } })) return
		return new Response(null, {
			status: 301,
			headers: {
				Location: "https://railway.app/template/BLofAq?referralCode=bonus",
			},
		})
	},
	websocket: {
		open(ws) {
			ws.send("Username:")
		},
		message(ws, message) {
			if (typeof message !== "string") return
			if (!ws.data.username) return handleUsername(ws, message)
			if (!ws.data.room) return handleRoom(ws, message)
			ws.publish(ws.data.room, `${ws.data.username}: ${message}`)
		},
		close(ws) {
			if (!ws.data.room) return
			server.publish(ws.data.room, `${ws.data.username} has left the room`)
		},
	},
})

process.on("SIGINT", () => {
	server.stop()
})
