db = db.getSiblingDB("foodhunter")
dishCollection = db.getCollection("dish")
dishCollection.remove({})
dishCollection.insert(
    {
        restaurantID: 1,
        dishID: 1,
        dishName: "Fall Risotto",
        dishDetails: "butternut squash",
        dishPrice: 19
    }
)

dishCollection.insert(
    {
        restaurantID: 2,
        dishID: 2,
        dishName: "sushi set a",
        dishDetails: "tuna salmon, yellowtail",
        dishPrice: 9
    }
)

dishCollection.insert(
    {
        restaurantID: 2,
        dishID: 3,
        dishName: "curry",
        dishDetails: "Stir-fried Thai rice noodles",
        dishPrice: 9.95
    }
)