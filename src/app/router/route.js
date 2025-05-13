import express from 'express';
import { userRoute } from '../modules/users/user.route.js';
import { courseRoute } from '../modules/course/course.route.js';
import { enrolledRoute } from '../modules/enrolledCourse/enrolled.route.js';
import { jwtRouter } from '../modules/jwt/jwt.route.js';
import { commentRouter } from '../modules/comments/comment.route.js';
import { likeRouter } from '../modules/likeDislike/like.route.js';
const router = express.Router();

const routes = [
    {
        path : "/users",
        route : userRoute
    },
    {
        path : "/course",
        route : courseRoute
    },
    {
        path : "/enrolled",
        route : enrolledRoute
    },
    {
        path : "/jwt",
        route : jwtRouter
    },
    {
        path : "/comment",
        route : commentRouter
    },
    {
        path : "/reaction",
        route : likeRouter
    },
]

routes.forEach((route)=>{
    router.use(route.path,route.route)
})

export default router 