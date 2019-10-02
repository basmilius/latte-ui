import { getMainElement } from "../../js/core";

export const MoveToMainDirective = {

	inserted(el)
	{
		const mainElement = getMainElement();

		mainElement.appendChild(el);
	},

	unbind(el)
	{
		if (el.parentNode)
			el.parentNode.removeChild(el);
	}

};
