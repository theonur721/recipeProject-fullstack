// expressi import etme
const express = require("express");
const cors = require("cors");
const recipteRouter = require("./routes/recipeRoutes");

const app = express();

// cors hatalarını önleyen middleware ( oto header ekler - http:127.0.01 ile localhost veri bağlantısı için)
app.use(cors());

// bodydaki json verilerini js ye çeviren
app.use(express.json());

// servera tarifle olan routeleri tanıttık --- get,post vs başka yerlerde tanıtıp burada kullandık
app.use(recipteRouter);

// dinlenecek portu belirle
app.listen(4001, ()=>{
    console.log("server 4001 portu dinlemeye başladı");
});