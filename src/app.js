const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");
const db = require('./util/database');
const errorController = require("./controllers/error");

const sequelize = require('./util/database');
const e = require("express");
const Product = require("./models/product");
const User = require("./models/user");

const PORT = process.env.NODE_DOCKER_PORT || 3001;

const app = express();

// app.set('view engine', 'pug');

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync().then((result) => {
    return User.findByPk(1)
})
.then((user) =>{
    if(!user) {
        return User.create({name: 'Peter', email: 'tapi@pmani.com'})
    }
    return user;
})
.then((user) => {
    console.log(user)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
})
.catch((err) => {
    console.log(err)
});

