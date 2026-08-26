const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);