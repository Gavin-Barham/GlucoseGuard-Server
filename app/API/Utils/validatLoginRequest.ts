const validateLogin = (email: string, password: string) => {
	// CHECK IF EMAIL IS PRESENT AND IN A VALID FORMAT
	if (!email || !email.includes('@')) {
		return {
			error: true,
			status: 400,
			message: 'Invalid email',
		};
	}

	// CHECK IF PASSWORD IS AT LEAST 8 CHARACTERS
	else if (!password || password.length < 8) {
		return {
			error: true,
			status: 403,
			message: 'Invalid password',
		};
	} else
		return {
			error: false,
			status: 200,
			message: 'Password is valid',
		};
};

export { validateLogin };
