const products = [
    {
        "id": "1",
        "title": "Amal Ard Al Zaafaran Eau de Parfum 100 ml",
        "img": "https://akparfumerie.com/cdn/shop/files/Ard_Al_Zaafaran_Saheb_Intense.png?v=1766772844",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Ard_Al_Zaafaran_Saheb_Intense2_large.jpg?v=1766772857",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 10000,
        "countInStock": 10,
        "rating": 4,
        "numReviews": 4,
        "genre": "elle", // Ajouté
        "fragrance": ["oriental", "floral"], // Ajouté
        "featured": true // Ajouté
    },
    {
        "id": "2",
        "title": "Amal Ard Al Zaafaran Eau de Parfum 100 ml",
        "img": "https://akparfumerie.com/cdn/shop/files/Agathe_Kattegat_AK_Extrait_de_Parfum.webp?v=1767386079",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Agathe_Kattegat_AK_Extrait_de_Parfum2_large.webp?v=1767385969",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 12000,
        "countInStock": 10,
        "rating": 5,
        "numReviews": 8,
        "genre": "lui", // Ajouté
        "fragrance": ["woody", "fresh"], // Ajouté
        "featured": false
    },
    {
        "id": "3",
        "title": "Amal Ard Al Zaafaran Eau de Parfum 100 ml",
        "img": "https://akparfumerie.com/cdn/shop/files/Agathe_Kattegat_Flamme_Vanille_Extrait_de_Parfum.webp?v=1767391858",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Agathe_Kattegat_Flamme_Vanille_Extrait_de_Parfum2_large.webp?v=1767391874",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 15000,
        "countInStock": 10,
        "rating": 4,
        "numReviews": 6,
        "genre": "mixte", // Ajouté
        "fragrance": ["floral", "citrus"], // Ajouté
        "featured": true
    },
    {
        "id": "4",
        "title": "Amal Ard Al Zaafaran Eau de Parfum 100 ml",
        "img": "https://akparfumerie.com/cdn/shop/files/Ahmed_Al_Maghribi_Ignite_Oud.png?v=1766784746",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Ahmed_Al_Maghribi_Ignite_Oud2_large.webp?v=1766784759",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 8000,
        "countInStock": 10,
        "rating": 3,
        "numReviews": 4,
        "genre": "lui", // Ajouté
        "fragrance": ["oriental", "woody"], // Ajouté
        "featured": false
    },
    {
        "id": "5",
        "title": "Amal Ard Al Zaafaran Eau de Parfum 100 ml",
        "img": "https://akparfumerie.com/cdn/shop/files/Bois_Intense_2004_Collection_Priv_e.png?v=1766780204",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Barcode_Signature_Paris_Corner2_large.png?v=1766780783",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 18000,
        "countInStock": 10,
        "rating": 5,
        "numReviews": 12,
        "genre": "elle", // Ajouté
        "fragrance": ["fresh", "citrus"], // Ajouté
        "featured": true
    },
    {
        "id": "6",
        "title": "Mousuf Daisy Ard Al Zaafaran",
        "img": "https://akparfumerie.com/cdn/shop/files/Amal_Ard_Al_Zaafaran_Eau_de_Parfum_100_ml.png?v=1767126079",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Amal_Ard_Al_Zaafaran_Eau_de_Parfum_100_ml2_large.webp?v=1767126103",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 11000,
        "countInStock": 10,
        "rating": 4,
        "numReviews": 7,
        "genre": "elle", // Ajouté
        "fragrance": ["floral", "oriental"], // Ajouté
        "featured": false
    },
    {
        "id": "7",
        "title": "Mousuf Daisy Ard Al Zaafaran",
        "img": "https://akparfumerie.com/cdn/shop/files/Ard_Al_Zaafaran_Bint_Hooran.png?v=1766340828",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Ard_Al_Zaafaran_Bint_Hooran2_large.png?v=1766340850",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 9000,
        "countInStock": 10,
        "rating": 4,
        "numReviews": 5,
        "genre": "mixte", // Ajouté
        "fragrance": ["woody", "fresh"], // Ajouté
        "featured": true
    },
    {
        "id": "8",
        "title": "Mousuf Daisy Ard Al Zaafaran",
        "img": "https://akparfumerie.com/cdn/shop/files/Asdaaf_Ameerat_Al_Arab_Prive_Rose.png?v=1766264659",
        "hoverImg": "https://akparfumerie.com/cdn/shop/files/Dirham-Wardi_large.png?v=1766342691",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium, quos culpa enim quibusdam impedit provident modi",
        "price": 13000,
        "countInStock": 10,
        "rating": 5,
        "numReviews": 10,
        "genre": "lui", // Ajouté
        "fragrance": ["oriental", "citrus"], // Ajouté
        "featured": false
    },
];

export default products;