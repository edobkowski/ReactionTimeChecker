# ReactionTimeChecker

## Overview
This JS based web app was created for collecting data about user's reactions to the audio files. The user is to press any key on the keybord (under specified conditions) while listening chosen audio file. The script will generate report containing information about the listened file, time (in seconds) of the record when the keys were pressed, date and time of the measurement. Generated report use semicolon (`;`) as separator;

## Software installation
You do not need to install any further software. To run the application simply open the index.html (`{app_dir}/html` directory) file with a browser of your choice.

## Usage
- Enter filename for the report or leave it empty to download report with default name (current date & time).
- Choose desired audio file from the list and clik `SET` button.
- Play and pause the record with the controller button on the center.
- To download the report click on `save` button or simply leave the page - file will download automatically.

## Add new audio files
As the current version of this app doesn't support simple file upload to add new audiofiles please follow the steps:
- Put new audio files in the `{app_dir}/resources/audio/` directiory.
- Modify the content of index.html (`{app_dir}/html` directory) by adding new `<option>` tags in the section:

```
<select id="audio-selector">
    <option>no_man_no_cry.mp3</option>
    <option>psychosocial.mp3</option>
</select>
```

__NOTICE THAT__ you have to put exactly the same name with the file extention between those `<option>` tags as the file you added into `{app_dir}/resources/audio/` directiory!

## Built With
HTML5
CSS3
ES6

## Author
Eryk Dobkowski (edobkowski)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/edobkowski/ReactionTimeChecker/blob/master/LICENCE) file for details
