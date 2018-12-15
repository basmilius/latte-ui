<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="json-editor json-editor-view">
		<div class="json-editor json-editor-block" v-for="(item, index) in flowData" :key="key(item)" :class="[item.type, {'hide-block': hideMyBlock[index]}]">
			<div class="key">
				<button class="btn btn-text btn-icon btn-dark toggle" v-if="item.type === 'object' || item.type === 'array'" @click="toggleBlock(index)"><i :class="['mdi', {'mdi-chevron-down': !hideMyBlock[index]}, {'mdi-chevron-right': hideMyBlock[index]}]"></i></button>
				<input type="text" v-model="item.name" class="form-control" v-if="typeof item.name === 'string'" @blur="keyInputBlur(item, $event)"/>
				<span class="json-editor json-editor-o" v-if="item.type === 'array'">{{ "[" + item.childParams.length + "]" }}</span>
				<span class="json-editor json-editor-o" v-if="item.type === 'object'">{{ "{" + (item.childParams.length || 0) + "}" }}</span>
				<button class="btn btn-text btn-icon btn-dark trash" @click="deleteItem(parsedData, item, index)" v-if="item.type === 'object' || item.type === 'array'"><i class="mdi mdi-delete"></i></button>
			</div>
			<div class="value">
				<template v-if="item.type === 'object'">
					<latte-json-editor-view :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view>
				</template>
				<template v-else-if="item.type === 'array'">
					<latte-json-editor-view-array :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view-array>
				</template>
				<template v-else>
					<input type="text" v-model="item.remark" class="form-control" v-if="item.type === 'string'">
					<input type="number" v-model.number="item.remark" class="form-control" v-if="item.type === 'number'">
					<select name="value" v-model="item.remark" class="custom-select" v-if="item.type === 'boolean'">
						<option :value="true">TRUE</option>
						<option :value="false">FALSE</option>
					</select>
					<button class="btn btn-text btn-icon btn-dark trash" @click="deleteItem(parsedData, item, index)"><i class="mdi mdi-delete"></i></button>
				</template>
			</div>
		</div>
		<latte-json-editor-iaf v-if="isAddingItem" @confirm="newItem" @cancel="cancelNewItem"></latte-json-editor-iaf>
		<button class="btn btn-text btn-icon btn-dark" @click="addItem" v-if="!isAddingItem"><i class="mdi mdi-plus-circle"></i></button>
	</div>

</template>

<script>

	export default {

		name: "latte-json-editor-view",

		props: {

			parsedData: {
				required: true
			}

		},

		created()
		{
			this.flowData = this.parsedData;
		},

		data()
		{
			return {
				flowData: [],
				hideMyBlock: {},
				isAddingItem: false
			};
		},

		mounted()
		{
			for (let index in this.flowData)
				if (this.flowData.hasOwnProperty(index))
					this.$set(this.hideMyBlock, index, true);
		},

		methods: {

			key(item)
			{
				return JSON.stringify(item);
			},

			deleteItem(parentDOM, item, index)
			{
				this.flowData.splice(index, 1);
				this.$emit("input", this.flowData);
			},

			toggleBlock(index)
			{
				this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
			},

			addItem()
			{
				if (this.isAddingItem)
					return;

				this.isAddingItem = true;
			},

			cancelNewItem()
			{
				if (!this.isAddingItem)
					return;

				this.isAddingItem = false;
			},

			newItem(obj)
			{
				let oj = {
					name: obj.key,
					type: obj.type
				};

				if (obj.type === "array" || obj.type === "object")
				{
					oj.childParams = obj.value;
					oj.remark = null;
				}
				else
				{
					oj.childParams = null;
					oj.remark = obj.value;
				}

				if (!oj.name)
				{
					Latte.messages.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
					return;
				}

				this.flowData.push(oj);
				this.$emit("input", this.flowData);
				this.cancelNewItem();
			},

			keyInputBlur(item, e)
			{
				if (item.name.length <= 0)
				{
					Latte.messages.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
					item.name = "null";
					e.target.focus();
				}
			}

		}

	}

</script>
