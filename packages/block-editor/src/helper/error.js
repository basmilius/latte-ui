export function handleComponentError(err, component = undefined, data = undefined)
{
	console.error(`${component ? `Got a selection error in component ${component}` : "Got a selection error"}: ${err.message}`);

	if (data)
		console.dir(data);
}
