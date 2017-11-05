window.$ = window.jQuery = require("jquery"); // Hace que jQuery sea accesible publicamente

import {SongsService} from "./SongsService";
import SongsListManager from "./SongsListManager";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js";

const songService = new SongsService("/songs/");

const songsListManager = new SongsListManager(".songs-list", songService, PubSub);
songsListManager.init();

const songFormManager = new SongFormManager(".song-form", songService, PubSub);
songFormManager.init();