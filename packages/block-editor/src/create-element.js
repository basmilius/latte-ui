export function createElement(tag, props = undefined, content = undefined)
{
	if (typeof props !== "object" && content === undefined)
	{
		content = props;
		props = {};
	}

	const el = document.createElement(tag);

	if (props.class)
	{
		if (typeof props.class === "string")
			el.classList.add(...props.class.split(" ").filter(t => t.trim() !== ""));
		else
			el.classList.add(...props.class);
	}

	if (props.style)
		for (let prop in props.style)
			el.style[prop] = props.style[prop];

	if (content !== undefined)
	{
		if (typeof content === "string")
		{
			el.innerHTML = content;
		}
		else
		{
			for (let child of content)
				el.appendChild(child);
		}
	}

	return el;
}
