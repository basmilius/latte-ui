<template>

	<div class="json-editor json-editor-iaf">
		<input class="form-control" id="iaf-key" type="text" v-model="keyName" placeholder="Key" v-if="needName"/>

		<select class="custom-select ml-3" id="iaf-type" v-model="formatSelected">
			<option :value="item" v-for="(item, index) in formats" :key="index">{{ item }}</option>
		</select>

		<template v-if="formatSelected !== 'array' && formatSelected !== 'object' && formatSelected !== 'null'">
			<input class="form-control ml-3" :id="'iaf-value'" type="text" v-model="valueName" placeholder="Value" v-if="formatSelected === 'string'"/>
			<input class="form-control ml-3" :id="'iaf-value'" type="number" v-model="valueName" placeholder="Value" v-if="formatSelected === 'number'" @change="dealNumber"/>
			<select v-model="valueName" class="custom-select ml-3" :id="'iaf-value'" v-if="formatSelected === 'boolean'" @change="dealBoolean">
				<option value="true" selected>TRUE</option>
				<option value="true">FALSE</option>
			</select>
		</template>

		<button class="btn btn-text btn-icon btn-primary ml-3" @click="confirm"><i class="mdi mdi-check-circle"></i></button>
		<button class="btn btn-text btn-icon btn-dark ml-1" @click="cancel"><i class="mdi mdi-close-circle"></i></button>
	</div>

</template>

<script>

	export default {

		name: "latte-json-editor-iaf",

		props: {

			needName: {
				default: true
			}

		},

		data()
		{
			return {
				formats: ["string", "array", "object", "number", "boolean", "null"],
				formatSelected: "string",
				keyName: "",
				valueName: ""
			};
		},

		methods: {

			confirm()
			{
				let value = null;

				if (this.formatSelected === "array")
					value = [];
				else if (this.formatSelected === "null")
					value = null;
				else if (this.formatSelected === "object")
					value = [];
				else
					value = this.valueName;

				let objectData = {
					key: this.needName ? this.keyName : null,
					value: value,
					type: this.formatSelected
				};

				this.$emit("confirm", objectData);

				this.keyName = "";
				this.valueName = "";
				this.formatSelected = "string";
			},

			cancel()
			{
				this.$emit("cancel");
			},

			dealBoolean()
			{
				this.valueName = Boolean(this.valueName);
			},

			dealNumber()
			{
				this.valueName = Number(this.valueName);
			}

		}

	}

</script>
