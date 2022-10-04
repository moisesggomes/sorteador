import express from "express"
import path from "path"

const __dirname = path.resolve(".");

const app = express();

const host = "localhost";
const port = 8080;
app.listen(8080, () => console.log(`Server is running on http://${host}:${port}`));

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    return response.sendFile(path.join(__dirname, "index.html"));
});