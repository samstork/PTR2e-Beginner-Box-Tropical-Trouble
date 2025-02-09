import { onImportAdventure, onRenderAdventureImporter } from "./importer.mjs";
import BeginnerBoxJournalSheet from "./journal-sheet.mjs";

/**
 * The module ID
 * @type {string}
 */
const MODULE_ID = "ptr2e-beginner-box";


/**
 * @typedef {Module} Module
 * @property {object} CONST
 * @property {string} CSS_CLASS
 */

Hooks.once("init", function() {
  /**
   * Global reference to the module.
   * @type {Module}
   */
  globalThis.beginnerbox = game.modules.get(MODULE_ID);

  /**
   * Constants used by the module.
   * @type {object}
   */
  beginnerbox.CONST = {}

  /**
   * The CSS class used to identify module applications.
   * @type {string}
   */
  beginnerbox.CSS_CLASS = "ptr-bb";

  // Register sheets
  DocumentSheetConfig.registerSheet(JournalEntry, MODULE_ID, BeginnerBoxJournalSheet, {
    types: ["base"],
    label: "PTR 2e - Beginner Box",
    makeDefault: false
  })
})

Hooks.on("renderJournalPageSheet", (app, html) => {
  const doc = app.document;
  const journalFlag = doc.parent.sheet instanceof BeginnerBoxJournalSheet;
  if ( !journalFlag ) return;
  html.addClass(beginnerbox.CSS_CLASS);
})

Hooks.on("renderAdventureImporter", onRenderAdventureImporter);
Hooks.on("importAdventure", onImportAdventure)