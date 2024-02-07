import {Router} from 'express'
import {signin,signup,profile} from "./../controllers/auth.controller"
const router:Router=Router()

router.post("/api/signup",signup)
router.post("/api/signin",signin)
router.get("/api/profile",profile)

export default router