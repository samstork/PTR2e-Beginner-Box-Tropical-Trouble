/**
 * The custom Journal Sheet used for Beginner Box content.
 */
export default class BeginnerBoxJournalSheet extends JournalSheet {
  constructor(doc, options) {
    super(doc, options);
    this.options.classes.push(beginnerbox.CSS_CLASS);
  }
}
