'use strict';


	document.getElementById("settings").addEventListener('click', () =>
		browser.runtime.openOptionsPage().then(_ => window.close())
	);
