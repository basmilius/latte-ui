import State from "./State";

Vue.mixin({

	beforeCreate()
	{
		this["$ui"] = State;
	}

});
