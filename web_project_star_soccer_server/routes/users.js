const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { getUserInfo, updateUserProfile } = require("../controllers/users");

router.get("/me", getUserInfo);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().optional().min(2).max(30),
      email: Joi.string().optional().email(),
      phone: Joi.string().optional().min(11).max(30),
      password: Joi.string().optional().min(6),
    }),
  }),
  updateUserProfile
);

module.exports = router;
