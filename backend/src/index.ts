// import express from "express";
// import { ENV } from "./config/env";

// const app = express();

// app.get("/", (req, res) => {
//     res.json({
//         message:
//             "Welcome to PERN API  - Powered by PostgreSQL, Drizzle ORM & Better Auth",
//         endpoints: {
//             users: "/api/users",
//             products: "/api/products",
//             comments: "/api/comments",
//         },
//     });
// });

// app.listen(ENV.PORT, () =>
//     console.log("Server is up and running on PORT: ", ENV.PORT),
// );

import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rute
app.use(routes);

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
    console.log(`Auth endpoint: ${ENV.BETTER_AUTH_URL}`);
});
