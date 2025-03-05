export const leadSchema = {
	type: "object",
	properties: {
		firstName: { type: "string" },
		lastName: { type: "string" },
		email: { type: "string", format: "email" },
		linkedInProfile: { type: "string" },
		visasOfInterest: {
			type: "array",
			items: {
				type: "string",
				enum: ["USA", "Canada", "UK", "Australia", "Germany"],
			},
			uniqueItems: true,
		},
		additionalInfo: { type: "string" },
	},
};

export const leadUiSchema = {
	type: "VerticalLayout",
	elements: [
		{ type: "Control", scope: "#/properties/firstName" },
		{ type: "Control", scope: "#/properties/lastName" },
		{ type: "Control", scope: "#/properties/email" },
		{ type: "Control", scope: "#/properties/linkedInProfile" },
		{
			type: "Control",
			scope: "#/properties/visasOfInterest",
			options: { format: "checkbox" },
		},
		{
			type: "Control",
			scope: "#/properties/additionalInfo",
			options: { multi: true },
		},
	],
};
