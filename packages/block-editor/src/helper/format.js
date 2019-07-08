const types = {

	bold(text)
	{
		return `<strong>${text}</strong>`;
	},

	italic(text)
	{
		return `<em>${text}</em>`;
	}

};

export function formatText(text, formats)
{
	if (!formats || formats.length === 0)
		return text;

	let formatted = text;

	formats = formats
		.sort((a, b) => a.offset === b.offset ? a.length - b.length : b.offset - a.offset)
		.filter(f => types[f.type] !== undefined);

	for (let format of formats)
	{
		let result = types[format.type](text.substr(format.offset, format.length), format);

		formatted = formatted.substr(0, format.offset) + result + formatted.substr(format.offset + format.length);
	}

	return formatted;
}
