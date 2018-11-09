<template>

	<div class="json-editor json-editor-view array">
		<div class="json-editor json-editor-block" v-for="(item, index) in flowData" :key="index" :class="[item.type, {'hide-block': hideMyBlock[index]}]">
			<div class="key">
				<button class="btn btn-text btn-icon btn-dark toggle" v-if="item.type === 'object' || item.type === 'array'" @click="toggleBlock(index)"><i :class="['mdi', {'mdi-chevron-down': !hideMyBlock[index]}, {'mdi-chevron-right': hideMyBlock[index]}]"></i></button>
				<span class="key">{{ index }}</span>
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
		<latte-json-editor-iaf v-if="isAddingItem" :needName="false" @confirm="newItem" @cancel="cancelNewItem"></latte-json-editor-iaf>
		<button class="btn btn-text btn-icon btn-dark" @click="addItem" v-if="!isAddingItem"><i class="mdi mdi-plus-circle"></i></button>
	</div>

</template>

<script>

	export default {

		name: "latte-json-editor-view-array",

		props: {

			parsedData: {
				required: true
			}

		},

		data()
		{
			return {
				hideMyBlock: {},
				flowData: this.parsedData,
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

			deleteItem(parentDom, item, index)
			{
				this.flowData.splice(index, 1);
				this.$emit("input", this.flowData);
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

			toggleBlock(index)
			{
				this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
			},

			newItem(obj)
			{
				let oj = {
					name: obj.key,
					type: obj.type
				};

				if (obj.type === 'array' || obj.type === 'object')
				{
					oj.childParams = obj.value;
					oj.remark = null;
				}
				else
				{
					oj.childParams = null;
					oj.remark = obj.value;
				}

				this.flowData.push(oj);
				this.$emit("input", this.flowData);
				this.cancelNewItem();
			}

		}

	}

</script>
