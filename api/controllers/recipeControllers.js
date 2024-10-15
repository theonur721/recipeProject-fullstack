const getData = require("../utils/getData");
const data = getData();
const crypto = require("crypto");
const setData = require("../utils/setData");

exports.getAllRecipes = (req,res)=> {
    // tariflerin kopyasını oluştur
    let recipes = [...data];

    // aratılan terim (küçük harf duyarlılığıyla)
    const search = req.query?.search?.toLowerCase();
    // eğer search param eklendiyse filtrele
    if(search) {
        recipes = data.filter((recipe)=>
            recipe.recipeName.toLowerCase().includes(search)
        );
    }

    // eğer order parametresi eklendiyse sırala
    if(req.query.order) {
        recipes.sort((a,b)=>
            req.query.order === "asc"
            ? a.recipeTime - b.recipeTime
            : b.recipeTime - c.recipeTime
        );
    }

    res.status(200).json({
        message: "Bütün tarifler alındı",
        results: recipes.length,
        recipes: recipes,
    });
};

exports.createRecipe = (req,res)=> {
    // 1) isteğin body bölümünde gelen veriye eriş
    const newRecipe = req.body;

    // 2) verinin bütün değerleri tanımlanmışmı emin ol recipeTime vs...
    if(
        !newRecipe.recipeName ||
        !newRecipe.recipeTime ||
        !newRecipe.category ||
        !newRecipe.ingredients ||
        !newRecipe.instructions ||
        !newRecipe.image
    ) {
        return res.status(400).json({message: "lütfen bütün değerleri tanımlayınız"});
    }

    // 3) veriye id ekle
    newRecipe.id = crypto.randomUUID();

    // 4) tarif verisini diziye ekle
    data.push(newRecipe);

    // 5) güncel diziyi json dosyasını aktar
    setData(data);

    // 6) cevap gönder
    res.status(200).json({
        message: "Bu Tarif oluşturuldu",
    });
};

exports.getRecipe = (req,res)=> {
    // dizide param ile gelen id li tarifi ara
    const found = data.find ((i)=> i.id === req.params.id);

    // tarif bulunmazsa hata gönder
    if(!found)
        return res.status(400).json({message: "Aradığınız id'li eleman bulunamadı"})

    // cevap gönder
    res.status(200).json({
        message: "Bu tarif alındı",
        recipe: found,
    });
};

exports.deleteRecipe = (req,res)=> {
    // silinecek elemanın sırasını bul
    const index = data.findIndex((i)=> i.id === req.params.id);

    // elemeanı diziden kaldır
    data.splice(index,1);

    // json dosyasını güncelle
    setData(data);

    // cevap göncer
    res.status(200).json({
        message: "Bu tarif silindi",
    });
};

