const { User, Thought } = require('../models');
const { deleteThought } = require('./thought-controller');

const userController = {
    //BONUS: remove user thoughts when deleted
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Invalid user id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // createUser,
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // updateUser,
    updateUser({ params, body}, res) {
        User.findOneAndUpdate(
                { _id: params.id }, 
                body, 
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "invalid user id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // deleteUser
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(deletedUserData => {
                if (!deletedUserData) {
                    return res.status(404).json({ message: "invalid user id"});
                }
                res.json(deletedUserData);
                console.log("=============");
                console.log(deletedUserData.thoughts)
                return Thought.deleteMany({ _id: {$in:deletedUserData.thoughts} });
            })
            .catch(err => res.status(400).json(err));
    },
    // add friend to friends list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true}
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'invalid user id' })
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // remove friend from friends list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends:params.friendId } },
            { new: true}
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'invalid user id' })
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    } 
}

module.exports = userController;