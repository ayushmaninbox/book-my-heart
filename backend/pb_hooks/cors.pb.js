/// <reference path="../pb_data/types.d.ts" />

// Add CORS headers to all responses
routerAdd("GET", "/*", (c, next) => {
    // Set CORS headers for all origins (you can restrict this later)
    c.response().header().set("Access-Control-Allow-Origin", "*")
    c.response().header().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.response().header().set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    return next(c)
})

routerAdd("POST", "/*", (c, next) => {
    // Set CORS headers
    c.response().header().set("Access-Control-Allow-Origin", "*")
    c.response().header().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.response().header().set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    return next(c)
})

routerAdd("PUT", "/*", (c, next) => {
    // Set CORS headers
    c.response().header().set("Access-Control-Allow-Origin", "*")
    c.response().header().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.response().header().set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    return next(c)
})

routerAdd("DELETE", "/*", (c, next) => {
    // Set CORS headers
    c.response().header().set("Access-Control-Allow-Origin", "*")
    c.response().header().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.response().header().set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    return next(c)
})

routerAdd("OPTIONS", "/*", (c) => {
    // Handle preflight requests
    c.response().header().set("Access-Control-Allow-Origin", "*")
    c.response().header().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.response().header().set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    
    return c.noContent(204)
})