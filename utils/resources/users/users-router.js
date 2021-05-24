const express = require("express");
const router = express.Router();
const Users = require("./user-model");

const {
    authenticate,
    UserOwnsPlant,
    duplicateCheck,
} = require("../../auth/authenticate");

router.use(express.json());

router.get("/", (req, res) => {
    res.send("<h1>Water my plants</h1>");
});

router.get("/dashboard/:id", authenticate, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({ message: "Please provide an id" });
    } else {
        try {
            const plants = await Users.getPlants(id);

            // const schedules = await Users.getScedules()
            //             res.status(200).json(plants);
            //
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

/*get individual plant*/
router.get(
    "/dashboard/:id/my_plant/:plant_id",
    authenticate,
    UserOwnsPlant,
    async (req, res) => {
        const { plant_id } = req.params;
        const id = plant_id;
        try {
            const plant = await Users.getPlant({ id });
            res.status(200).json(plant);
        } catch (error) {
            res.status(500).json({ error: "could not retreive plant" });
        }
    }
);

//workd
/*router.get('/dashboard/:id/my_plant/:plant_id/schedules', authenticate, UserOwnsPlant, async (req, res) => {
                                                                                                    const { id, plant_id  } = req.params;
                                                                                                        try {
                                                                                                                const schedule = await Users.getScedules(plant_id);
                                                                                                                        if (schedule) {
                                                                                                                                    res.status(200).json(schedule);
                                                                                                                                            }
                                                                                                                                                } catch (error) {
                                                                                                                                                        res.status(500).json({ error: 'could not add schedule'  });
                                                                                                                                                            }
                                                                                                                                                            });*/

router.post("/register", async (req, res) => {
    // const usernameExist = await User.findOne({ username: req.body.username  });

    // if (usernameExist) {
    //     res.status(400).json({ error: 'username already Exist'  });
    // }

    const { username, password, phone } = req.body;

    if (!username || !password || !phone) {
        res.status(400).json({
            error: "require username, password, and phone number",
        });
    } else {
        try {
            /*console.log("REGISTER", reg.body)*/
            const user = await Users.register(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "require username and password" });
    } else {
        try {
            console.log("try", req.body);
            const user = await Users.login(req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(200).json({
                    message: "incorrect username or password",
                });
            }
        } catch (error) {
            res.status(500).json({ error: "could not login" });
        }
    }
});

//Create New Plant
router.post(
    "/dashboard/:id/plants/add",
    authenticate,
    duplicateCheck,
    async (req, res) => {
        const { id } = req.params;
        const {
            name,
            light,
            type,
            water_frq,
            next_watering,
            last_watering,
            notes,
        } = req.body;
        if (
            (!name,
            !light,
            !type,
            !water_frq,
            !next_watering,
            !last_watering,
            !notes)
        ) {
            res.status(400).json({
                error: "require plant name, type, and light",
            });
        } else {
            try {
                const plant = await Users.addPlant(req.body, id);
                res.status(200).json(plant);
            } catch (error) {
                res.status(500).json({ error: "could not add plant" });
            }
        }
    }
);

//Create Plant schedule
/*router.post('/dashboard/:id/my_plant/:plant_id/add_schedule', authenticate, UserOwnsPlant, async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const { water_schedule  } = req.body;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    const { id, plant_id  } = req.params;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.log(water_schedule);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (!water_schedule) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    res.status(400).json({ error: 'please add a water schedule'  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const schedule = await Users.addSchedule(req.body, id, plant_id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if (schedule) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        res.status() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const schedule_id = req.params.sch_id;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        const remove = await Users.deleteSchedule(schedule_id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                res.status(200).end();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            res.status(500).json({ error: 'could not schedule'  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });*/

module.exports = router;
