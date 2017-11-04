window.$ = window.jQuery = require("jquery"); // Hace que jQuery sea accesible publicamente

import {SongsService} from "./SongsService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";

const songService = new SongsService("/songs/");
const songsListUIManager = new UIManager(".songs-list");
const songsListManager = new SongsListManager(songService, songsListUIManager );

songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songService);

songFormManager.init();