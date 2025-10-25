import User from "../Model/User.js";

export const createUser = async (res, req) => {
	const { username, email, password } = req.body;

	//ajouter etapes verif ici

	const user = new User({ username, email, password });
	await user.save();
};

export const getAllUsers = async (res, req) => {
	const allUsers = User.find();
	res.json(allUsers);
};

export const getUserByID = async (res, req) => {
	const userbyID = await User.findById(req.params.id);

	if (!userbyID) {
		return res.status(418);
	}
	res.json(userbyID);
};

export const updateUser = async (res, req) => {
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
};

export const deleteUser = async (res, req) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) {
		return res.status(418);
	}

	res.json(user);
};
