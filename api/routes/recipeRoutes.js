const express = require("express");

const {
    getAllRecipes,
    createRecipe,
    deleteRecipe,
    getRecipe,
} = require("../controllers/recipeControllers");

// router serverjs dışında route tanıtmaya yarar
const router = express.Router();

// oluşan routerin endpoint/route/yollarını ve istek gelince çalışcak fonksiyonu belirle
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);


// serverda kullanmak için routeleri rapor et
module.exports = router;