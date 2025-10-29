import User from "../Model/User.js";

export const createUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		//ajouter etapes verif ici

		const user = new User({ username, email, password });
		const saveUser = await user.save();
		res.status(200).json(saveUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getUserByID = async (req, res) => {
	try {
		const userByID = await User.findById(req.params.id);

		if (!userByID) {
			return res.status(418);
		}
		res.status(200).json(userByID);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				username,
				email,
				password,
			},
			{ new: true }
		);

		if (!user) {
			return res.status(418);
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(418);
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
