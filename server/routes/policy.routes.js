module.exports = app => {
    const policy = require("../controllers/policy.controller.js");

// Add a new policy
    app.post("/policy", policy.create);

    // Get all policies
    app.get("/policy", policy.findAll);
};

