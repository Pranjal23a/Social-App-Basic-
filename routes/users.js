const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");

router.get("/profile/:id", passport.checkAuthentication, userController.profile);
router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get("/signUp", userController.signUp);
router.get("/signIn", userController.signIn);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  userController.createSession
);
router.get("/signOut", userController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'users/signIn' }), userController.createSession);

module.exports = router;
