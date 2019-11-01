import "./scss/_index.scss";

import { initializeInternationalization } from "./core/i18n";
import { initializeCategoryRegistry } from "./core/category/registry";
import { initializeBlockRegistry } from "./core/block/registry";

export { default as Editor } from "./component/Editor";
export { default as SettingsPane } from "./component/SettingsPane";

initializeInternationalization();
initializeCategoryRegistry();
initializeBlockRegistry();
