export function portal(h, to, children)
{
	return h("latte-portal", {props: {to}}, children);
}

export function target(h, name)
{
	return h("latte-portal-target", {props: {name}});
}
