# Known issues

## Known issues in the current release

### [Issue 1](/link/to/issue/1): Storybook A11y addon does not test against dark mode in cli tests

**Date reported:** 05/07/23

**Description:** The Storybook A11y addon only tests against light-mode does not test against dark mode in cli-mode.

**Workaround:** In the UI, you can manually change to dark mode and then refresh the page to test dark mode and it works. However,
without cli-mode support, the A11y tests cannot be considered fully automated.
