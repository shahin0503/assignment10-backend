const UserModel = require('../models/user_model')
const bcrypt = require('bcrypt')

const userController = {

    createAccount: async (req, res) => {
        try {
            const userData = req.body
            const newUser = new UserModel(userData)
            await newUser.save()

            return res.json({ success: true, data: newUser, message: "User created!" })

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body

            const foundUser = await UserModel.findOne({ email: email })
            if (!foundUser) {
                return res.json({ success: false, message: 'User not found!' })
            }

            const passwordsMatch = bcrypt.compareSync(password, foundUser.password)

            if (!passwordsMatch) {
                return res.json({ success: false, message: 'Incorrect password!' })
            }
            return res.json({ success: true, data: foundUser })

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },

    updateUser: async function (req, res) {
        try {
            const userId = req.params.id
            const updateData = req.body

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                updateData,
                { new: true }
            )

            if (!updatedUser) {
                throw 'user not found!'
            }

            return res.json({ success: true, data: updateData, message: 'User updated!' })

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }

}

module.exports = userController