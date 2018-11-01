/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { initialize as initializeActionSystem } from "./actions.js";

import { createComponent as createAutocompleteComponent } from "./component/autocomplete.js";
import { createComponent as createButtonDropdownComponent } from "./component/button-dropdown.js";
import { createComponent as createChartComponent } from "./component/chart.js";
import { createComponent as createDataTableComponent } from "./component/data-table.js";
import { createComponent as createDatePickerComponent } from "./component/datepicker.js";
import { createComponent as createDraggableGridComponent } from "./component/draggable-grid.js";
import { createComponent as createDraggableComponent } from "./component/draggable.js";
import { createComponent as createFileManagerComponent } from "./component/file-manager.js";
import { createComponent as createJsonEditorComponent } from "./component/json-editor.js";
import { createComponent as createMomentComponent } from "./component/moment.js";
import { createComponent as createOverlayComponent } from "./component/overlay.js";
import { createComponent as createPaginationComponent } from "./component/pagination.js";
import { createComponent as createPasswordComponent } from "./component/password.js";
import { createComponent as createPdfViewerComponent } from "./component/pdf-viewer.js";
import { createComponent as createRepeatingFormComponent } from "./component/repeating-form.js";
import { createComponent as createTreeViewComponent } from "./component/tree-view.js"
import { createComponent as createUploadUserPhotoComponent } from "./component/upload-user-photo.js";

import { initializeDeployer } from "./deployer.js";

import { createDirective as createClickAwayDirective } from "./directive/click-away.js";
import { createDirective as createLatteContextMenuDirective } from "./directive/context-menu.js";

import { initialize as initializeForms } from "./forms.js";
import { initialize as initializeI18n } from "./i18n.js";
import { initialize as initializeNotices } from "./notices.js";
import { initialize as initializePanels } from "./panel.js";
import { initialize as initializeSDK } from "./sdk.js";

import { initialize as initializeMessages } from "./ui/messages.js";
import { initialize as initializeNotifications } from "./ui/notification.js";

import { createRootComponent } from "./ui/root.js";
import { create$UIMixin } from "./ui/state.js";
import { createTooltipComponent } from "./ui/tooltip.js";

import { createView as createDashboardView } from "./view/dashboard.js"
import { createView as createLoginView } from "./view/login.js"
import { createView as createProfileView } from "./view/profile.js";
import { createWidget as createTodayWidget } from "./widget/today.js";

import { createWidget as createWidgetWidget } from "./widget/widget.js";

let rootComponent;

/**
 * Initializes everything.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function initialize()
{
	moment.locale("nl");

	initializeSDK();
	initializeI18n();
	initializeActionSystem();
	initializeNotifications();
	initializeMessages();

	create$UIMixin();

	registerDirectives();
	registerComponents();
	registerViews();
	registerWidgets();
}

/**
 * Registers our root component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerRoot()
{
	rootComponent = createRootComponent();
}

/**
 * Registers our core components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerComponents()
{
	createAutocompleteComponent();
	createButtonDropdownComponent();
	createChartComponent();
	createDataTableComponent();
	createDatePickerComponent();
	createDraggableComponent();
	createDraggableGridComponent();
	createFileManagerComponent();
	createJsonEditorComponent();
	createMomentComponent();
	createOverlayComponent();
	createPaginationComponent();
	createPasswordComponent();
	createPdfViewerComponent();
	createRepeatingFormComponent();
	createTreeViewComponent();
	createUploadUserPhotoComponent();

	createTooltipComponent();

	if (window.LatteDebug || false)
		initializeDeployer();
}

/**
 * Registers our core directives.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerDirectives()
{
	createClickAwayDirective();
	createLatteContextMenuDirective();
}

/**
 * Registers our core views.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerViews()
{
	createDashboardView();
	createLoginView();
	createProfileView();
}

/**
 * Registers our core widgets.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerWidgets()
{
	createWidgetWidget();
	createTodayWidget();
}

/**
 * Invoked on DOMContentLoaded.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onDOMContentLoaded()
{
	registerRoot();
	initializeForms();
	initializeNotices();
	initializePanels();
}

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);

initialize();
