export function combine(a, b)
{
	return function (evt)
	{
		if (a)
			a(evt);

		if (b)
			b(evt);
	};
}

export function terminate(evt, fn = undefined)
{
	evt.preventDefault();
	evt.stopPropagation();

	if (fn)
		fn();
}
