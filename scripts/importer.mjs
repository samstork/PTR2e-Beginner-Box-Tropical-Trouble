const PACK_ID = "ptr2e-beginner-box.ptr2e-beginner-box";

/**
 * Options provided in the adventure importer
 * @type {Object<string, {label: string, default: boolean, handler: function}>}
 */
const IMPORT_OPTIONS = {
  activateScene: {
    label: "Activate Initial Scene",
    default: true,
    handler: (adventure, option) => game.scenes.get(option.sceneId)?.activate(),
    sceneId: "IcJQ1ANTQUpd5GpW"
  },
  displayJournal: {
    label: "Display Introduction Journal Entry",
    default: true,
    handler: (adventure, option) => game.journal.get(option.entryId)?.sheet.render(true),
    entryId: "xaaSEf3E6lyvCxhP"
  },
  // customizeJoin: {
  //   label: "Customize World Details",
  //   default: false,
  //   background: "modules/pf2e-kingmaker/assets/journal-scenes/kingdom-exploration.webp",
  //   handler: async (adventure, option) => {
  //     const module = game.modules.get(beginnerbox.id);
  //     const worldData = {
  //       action: "editWorld",
  //       id: game.world.id,
  //       description: module.description,
  //       background: option.background
  //     }
  //     await fetchJsonWithTimeout(foundry.utils.getRoute("setup"), {
  //       method: "POST",
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(worldData)
  //     });
  //     game.world.updateSource(worldData);
  //   }
  // }
};

/* -------------------------------------------- */

/**
 * Extend the AdventureImporter application for the Kingmaker adventure.
 * Add checkboxes for additional import options.
 * Patch the async prepareImport method for the Adventure document to handle compendium overrides.
 * @param {AdventureImporter} app     The importer application being rendered
 * @param {jQuery} html               The inner HTML rendered to the application
 */
export function onRenderAdventureImporter(app, html) {
  const adventure = app.object;
  if ( adventure.pack !== PACK_ID ) return;

  // Add import options
  let importOptions = `<section class="import-form"><h2>Importer Options</h2>`;
  for ( const [name, option] of Object.entries(IMPORT_OPTIONS) ) {
    importOptions += `<div class="form-group">
        <label class="checkbox">
            <input type="checkbox" name="${name}" title="${option.label}" ${option.default ? "checked" : ""}/>
            ${option.label}
        </label>
      </div>`;
  }
  importOptions += `</section>`;
  html.find(".adventure-contents").append(importOptions);
  html.find("header.adventure-header").remove();
  $(html)[0].classList.add(beginnerbox.CSS_CLASS);
  app.setPosition({height: "auto"});
}

/* -------------------------------------------- */

/**
 * Once the adventure has been fully imported, apply import options that were selected by the user.
 * @param {Adventure} adventure       The adventure instance that was just imported
 * @param {object} importOptions      Options selected by the user at time of import
 */
export function onImportAdventure(adventure, importOptions) {
  if ( adventure.pack !== PACK_ID ) return;
  for ( const [optionId, checked] of Object.entries(importOptions) ) {
    if ( !(optionId in IMPORT_OPTIONS) || !checked ) continue;
    const option = IMPORT_OPTIONS[optionId];
    option.handler(adventure, option);
  }
}
