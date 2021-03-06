const { Thought, User } = require('../models');

const thoughtController = {
    // //BONUS: remove user thoughts when deleted
    // getAllUsers(req, res) {
    //     User.find({})
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => res.status(400).json(err));
    // },
    // getUserById({ params }, res) {
    //     User.findOne({ _id: params.id })
    //         .populate({
    //             path: 'friends',
    //             select: '-__v'
    //         })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: "Invalid user id"});
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.status(400).json(err));
    // },
    // // createUser,
    // createUser({ body }, res) {
    //     User.create(body)
    //         .then(dbUserData => res.json(dbUserData))
    //         .catch(err => res.status(400).json(err));
    // },
    // // updateUser,
    // updateUser({ params, body}, res) {
    //     User.findOneAndUpdate(
    //             { _id: params.id }, 
    //             body, 
    //             { new: true, runValidators: true }
    //         )
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: "invalid user id"});
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.status(400).json(err));
    // },
    // // deleteUser
    // deleteUser({ params }, res) {
    //     User.findOneAndDelete({ _id: params.id })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: "invalid user id"});
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.status(400).json(err));
    // },
    // // add friend to friends list
    // addFriend({ params }, res) {
    //     User.findOneAndUpdate(
    //         { _id: params.userId },
    //         { $push: { friends: params.friendId } },
    //         { new: true}
    //     )
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'invalid user id' })
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));
    // },
    // // remove friend from friends list
    // removeFriend({ params }, res) {
    //     User.findOneAndUpdate(
    //         { _id: params.userId },
    //         { $pull: { friends:params.friendId } },
    //         { new: true}
    //     )
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'invalid user id' })
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));
    // } 
    getAllThoughts({}, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    createThought({ body }, res) {
        const { thoughtText, username, userId } = body;
        Thought.create({ thoughtText, username })
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'invalid user id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'invalid thought id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'invalid thought id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'invalid thought id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction() {},
    removeReaction() {}
}

module.exports = thoughtController;