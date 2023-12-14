const express = require("express");
const apiRoutes = require("./server/api"); // Adjust the path accordingly

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
