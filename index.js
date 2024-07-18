const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
const port = 2305;
const path = require('path');
const methodOverride = require('method-override');
const auth = require("./middleware/auth");
const cookieParser = require('cookie-parser');
app.use(methodOverride('_method'));
const productsRouter = require('./routes/product.routes');
//const expressLayouts = require('express-ejs-layouts');

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Sử dụng body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressLayouts);

// Set static
app.use(express.static("public"));

// Set view engine
app.set("view engine", 'ejs');

// Routes
const webRouter = require("./routes/web.routes");
app.use("/", webRouter);

// Kết nối database
require("./model/database");

//config session
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret:"t2305mabcxyzkjm12345",
        cookie:{
            maxAge: 36000,
            secure: false
        }
    })
)

app.use("/protected-route", auth, (req, res) => {
    // Chỉ người dùng đã đăng nhập mới truy cập được route này
    res.send("This is a protected route");
});

app.use('/products', productsRouter);
app.set('views', path.join(__dirname, 'views'))


// Lắng nghe trên port
app.listen(port, function() {
    console.log("Server is running on port " + port);
});
