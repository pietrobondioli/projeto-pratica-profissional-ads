module.exports = {
	parser: '@typescript-eslint/parser',
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: ['apps/backend/tsconfig.json'],
				paths: true,
			},
		},
	},
	env: {
		browser: true,
		es2020: true,
	},
	plugins: [
		'react-refresh',
		'@typescript-eslint/eslint-plugin',
		'import',
		'prettier',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.js'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{
				allowConstantExport: true,
			},
		],
	},
};
