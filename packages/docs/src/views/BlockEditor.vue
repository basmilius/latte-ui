<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="panel radius-none" style="height: calc(100vh - 60px)">
		<Editor v-model="content"></Editor>
	</div>

</template>

<script>

	import { Editor, SettingsPane } from "../../../block-editor/src";

	export default {

		components: {
			Editor,
			SettingsPane
		},

		data()
		{
			return {
				content: [{"id": "heading", "options": {"color": "rgb(247, 54, 43)", "type": "h1", "text": "This is my amazing page!"}},
					{"id": "paragraph", "options": {"align": "left", "fontSize": 1, "indent": 0, "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in lorem eget est commodo vulputate eu quis ipsum. Nam dictum quis dui eget cursus. Phasellus tellus sapien, auctor et cursus eget, tempus ut justo. Donec placerat scelerisque nibh, eu consectetur elit imperdiet eu. Curabitur id ligula quis eros ullamcorper elementum. Fusce diam nibh, porttitor vel sagittis et, hendrerit in mauris. Nam elementum nibh in ipsum tempus, non semper lorem fringilla. In turpis dolor, venenatis lobortis malesuada non, posuere tempor tortor. Cras interdum mauris ut lorem volutpat, sit amet varius ex scelerisque.&nbsp;Suspendisse quam urna, varius ut pretium quis, lacinia a eros. Duis non nisi eu neque luctus ultricies et vel lectus.&nbsp;"}},
					{"id": "paragraph", "options": {"align": "right", "color": "rgb(126, 123, 158)", "fontSize": 1.35, "indent": 10, "text": "<i>\"Aenean varius pretium tortor eu porttitor. Vivamus finibus sagittis tellus, sit amet porta tortor tempor ac. Aenean ac mauris lobortis ipsum feugiat volutpat nec sit amet ex.\"</i>"}},
					{"id": "button", "options": {"class": "mx-auto mb-3", "pillButton": false, "rippleButton": true, "size": "lg", "text": "My awesome button", "type": "outline", "url": ""}},
					{
						"id": "columns", "options": {"class": "mb-3", "columns": 2, "gutters": true, "preset": 1}, "children": [[{"id": "youtube-embed", "options": {"videoId": "2TuyT0knklM"}}], [{"id": "heading", "options": {"type": "h5", "text": "Gavin DeGraw - Soldier"}},
							{"id": "paragraph", "options": {"align": "left", "fontSize": 1, "indent": 0, "text": "Phasellus commodo, lacus non viverra imperdiet, libero orci lacinia velit, sit amet malesuada dui diam eu lectus. Sed maximus eu orci ut condimentum.&nbsp;"}},
							{"id": "paragraph", "options": {"align": "left", "fontSize": 1, "indent": 0, "text": "Vivamus auctor sapien nisl, varius interdum libero malesuada sit amet. Integer vulputate facilisis urna id sollicitudin."}}]]
					},
					{
						"id": "paragraph",
						"options": {"align": "left", "fontSize": 1, "indent": 0, "text": "Integer ac vestibulum dolor, et euismod sem. Vivamus volutpat, lectus eget vulputate eleifend, nibh quam aliquet lorem, quis efficitur neque magna ac elit. Vestibulum ac risus eu ligula auctor cursus. Curabitur purus enim, accumsan nec magna vel, ornare sagittis nisi. Pellentesque libero lorem, rhoncus placerat mauris et, vehicula tempor turpis. Duis nec luctus metus. Maecenas consequat libero id nulla pharetra luctus. Donec ultricies tincidunt tincidunt. Suspendisse sollicitudin lacus nunc, sed ultricies tellus efficitur nec. Phasellus eget sem nec enim molestie venenatis nec ut tortor. Aliquam dictum tempus neque, at luctus elit mollis sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed pellentesque, metus pharetra auctor luctus, sem nunc mattis purus, at mattis turpis mauris nec dolor. Curabitur cursus enim non libero sodales tristique."}
					},
					{"id": "paragraph", "options": {"align": "left", "fontSize": 1, "indent": 0, "text": "Aliquam urna sapien, gravida eget cursus at, fringilla eu metus. In sapien odio, gravida hendrerit iaculis id, sodales sit amet nibh. Nunc nec efficitur diam. Fusce sagittis at nibh eget tristique. Integer elit felis, consequat nec fermentum ut, dignissim sit amet purus. Ut aliquam imperdiet faucibus. Etiam maximus mauris id sem aliquam, vel posuere leo viverra. Nulla eleifend leo in sapien cursus, congue mollis nunc ultrices."}}
				]
			};
		},

		destroyed()
		{
			document.body.style.removeProperty("overflow");
		},

		mounted()
		{
			document.body.style.setProperty("overflow", "hidden");
		}

	}

</script>
