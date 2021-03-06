export class Player {
    constructor() {
        this.tracks = [];
        this.trackIndex = 0;
        this.currentTrack = null;
        this.isPlaying = false;
        this.audio = null;
        this.volume = 0.5;
    }

    addTrack(track) {
        this.tracks.push(track);
    }

    get track() {
        return {
            img: this.currentTrack?.album.images[0].url,
            name: this.currentTrack?.name,
            artist: this.currentTrack?.artists[0].name
        };
    }

    set track(trackName) {
        const track = this.tracks.find((item, i) => {
            if (item.name === trackName) {
                this.trackIndex = i;
                return true;
            }
            return false;
        });
        this.currentTrack = track;

        if (this.audio) {
            this.audio.pause();
        }

        this.audio = new Audio(track.preview_url);
        this.audio.volume = this.volume;
    }

    play() {

        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        }

        this.audio.volume = this.volume;
        this.audio.play();
        this.isPlaying = true;
    }

    pause() {
        if (!this.audio) return;
        this.audio.pause();
        this.isPlaying = false;
    }

    setVolume(value) {
        this.volume = value;
        if (!this.audio) return;
        this.audio.volume = value;
    }

    nextTrack() {
        if (!this.currentTrack) return;

        this.trackIndex++;

        if (this.trackIndex > this.tracks.length - 1) {
            this.trackIndex = 0;
        }

        this.track = this.tracks[this.trackIndex].name;
        this.audio.play();
    }

    previousTrack() {
        if (!this.currentTrack) return;

        this.trackIndex--;

        if (this.trackIndex < 0) {
            this.trackIndex = this.tracks.length - 1;
        }

        this.track = this.tracks[this.trackIndex].name;
        this.audio.play();
    }
}