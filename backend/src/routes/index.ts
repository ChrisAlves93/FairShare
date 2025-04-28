import { Router } from "express"
import userRouter from "./user";
import accountRouter from "./account";
import transferRouter from "./transfer";

const router = Router();

router.use("/user", userRouter)
router.use("/account", accountRouter)
router.use("/transfer", transferRouter)


export default router;