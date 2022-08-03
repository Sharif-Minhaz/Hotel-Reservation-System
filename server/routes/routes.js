import authRoute from "./auth.route.js";
import hotelsRoute from "./hotels.route.js";
import roomsRoute from "./rooms.route.js";
import usersRoute from "./users.route.js";

const routes = [
	{
		path: "/api/auth",
		handler: authRoute,
	},
	{
		path: "/api/hotels",
		handler: hotelsRoute,
	},
	{
		path: "/api/rooms",
		handler: roomsRoute,
	},
	{
		path: "/api/users",
		handler: usersRoute,
	},
];

export default (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.handler);
	});
};
