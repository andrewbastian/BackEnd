exports.up = function (knex) {
    return knex.schema
        .createTable("users", (tbl) => {
            tbl.increments();

            tbl.string("username", 255).unique().notNullable();

            tbl.string("password", 255).notNullable();

            tbl.string("phone", 255).notNullable();

            tbl.string("profile_pic")
        })
        .createTable("plants", (tbl) => {
            tbl.increments();

            tbl.string("name", 255).notNullable();
            tbl.string("type", 255).notNullable();
            tbl.string("location", 255).notNullable();
            tbl.integer("water_frq", 255)
            tbl.datetime("next_watering",255)
            tbl.datetime("last_watering",255)
            tbl.text("notes")
            tbl.integer("user_id", 255)
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        })

        .createTable("plant_photos", (tbl) => {
            tbl.increments();

            tbl.integer("plant_id")
                .notNullable()
                .references("id")
                .inTable("plants")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.integer("user_id")
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            tbl.string("URL").notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("schedule")
        .dropTableIfExists("plants")
        .dropTableIfExists("users");
};
