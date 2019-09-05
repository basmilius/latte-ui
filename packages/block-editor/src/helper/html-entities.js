let decoder;

export function decodeEntities(text)
{
	if (typeof text !== "string" || text.indexOf("&") === -1)
		return text;

	if (!decoder)
	{
		if (document.implementation && document.implementation.createHTMLDocument)
			decoder = document.implementation.createHTMLDocument().createElement("textarea");
		else
			decoder = document.createElement("textarea");
	}

	decoder.innerHTML = text;
	const decoded = decoder.textContent;
	decoder.innerHTML = "";

	return decoded.trim();
}

export function removeEmptyDivs(text)
{
	return text.replace(/<div><\/div>/g, "");
}
