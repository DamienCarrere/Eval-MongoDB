import User from "../Model/User.js";

export const createUser = async (res, req) => {
	try {
		const { username, email, password } = req.body;

		//ajouter etapes verif ici

		const user = new User({ username, email, password });
		await user.save();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getAllUsers = async (res, req) => {
	try {
		const allUsers = User.find();
		res.json(allUsers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getUserByID = async (res, req) => {
	try {
		const userByID = await User.findById(req.params.id);

		if (!userByID) {
			return res.status(418);
		}
		res.json(userByID);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const updateUser = async (res, req) => {
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

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteUser = async (res, req) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(418);
		}

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
