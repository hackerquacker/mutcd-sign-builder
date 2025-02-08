# MUTCD Sign Builder
This is a JavaScript based web application that allows you to build your own custom signage and save them as images to your local machine. The signage has some changes from US MUTCD to fit into the NZ/Aus based system.

## Information for customising to your own needs
This information will help you add your own shields, and other elements.

### Adding shields
Adding your own custom shields is easy (if you are comfortable with JS coding :)). Just make sure to copy your shield into the img/shields folder and ensure that your shields are in the .png format, and dimensions are 509x512. Then open [js/sign.js](js/sign.js) and add a new entry in the `ShieldType` object. The key is the text that will be displayed on the website, and the value is the name of your shield file (without the .png).

By default, the text inside the shield will render as white. To change this, add a new CSS styling rule:
```
div.shields div.shieldgroup div.shield.{NAME-OF-SHIELD-FILE-WITHOUT-EXTENSION} {
    color: {TEXT-COLOUR-OF-ROUTE-NUMBER};
}
```

### Adding custom banners to the shield
This can be done by adding new strings into the `directions` table in [js/process.js](js/process.js).


## Project implementation
This project is a work-in-progress. Some of these features may never be added, depending on my personal needs for this project.
- [x] Render sign with custom text and basic arrows
- [ ] Add Exit Tabs
- [ ] Make it easier to customise sign colours, road name colours, banner colours.
- [ ] Expand arrows:
    - [ ] Allow Exit only signs to have a user specified number of arrows instead of 1
    - [ ] Add Exit only text to non-yellow bannered arrows
    - [ ] Add Lane specific arrows (WIP)
- [ ] Implement multi-panels so that one sign can have multiple sign elements for lane specific arrows

If you need Exit tabs, I'd recommend checking out [BrenStro/SignMaker](https://github.com/BrenStro/SignMaker) and screenshotting those in the mean time.

## Acknowledgements
* This project is inspired from the [BrenStro/SignMaker](https://github.com/BrenStro/SignMaker) project.
* Typefaces were sourced from the above project, itself sourced from the [Roadgeek 2005 Font Family by Michael Adams](https://n1en.org/roadgeek-fonts/)
* Dom-To-Image which converts the sign html into the downloadable PNG image files. Github page: [tsayen/dom-to-image](https://github.com/tsayen/dom-to-image)

## License
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.txt)