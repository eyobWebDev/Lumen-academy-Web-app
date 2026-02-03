import bcrypt from "bcryptjs"
/* import User from "./models/user.model.js"
import { generateToken } from "./config/utils.js"

const cteateAdmin = async () => {
    try {
        const username = "Eyob"
        const password = "19ey99ob"
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username,
            password: hashedPassword,
            role: "admin"
        })
        if (newUser) {
            await newUser.save()
            console.log("Admin user created", newUser)
        } else {
            console.log("Failed to create admin user")
        }
    } catch (e) {
        console.log("Error  creating user", e.message)
    }
}

cteateAdmin() */

const password = "19da99ni"
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("Hashed password:", hashedPassword)