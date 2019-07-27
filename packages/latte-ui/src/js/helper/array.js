export function oneOf(set)
{
	return value => set.includes(value);
}
