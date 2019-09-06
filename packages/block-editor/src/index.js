import { BlockRegistry, CategoryRegistry } from "./registry";
import "./scss/index.scss";

export { default as BEEditor } from "./BEEditor.vue";

BlockRegistry.registerDefaults();
CategoryRegistry.registerDefaults();

