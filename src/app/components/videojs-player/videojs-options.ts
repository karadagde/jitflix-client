export const vjsOptions = {
  techOrder: ['html5'],
  html5: {
    nativeAudioTracks: false,
    nativeVideoTracks: false,
    nativeTextTracks: false,
    hls: {
      overrideNative: true,
      debug: true,
    },
    vhs: {
      debug: true,
      overrideNative: true,
    },
  },

  controls: true,
  controlBar: {
    volumePanel: {
      inline: true,
    },
    skipButtons: {
      forward: 10,
      backward: 10,
    },
    qualitySelector: {
      enabled: true,
    },
  },

  muted: false,
  poster:
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_SX677_AL_.jpg',
  fluid: true,
  aspectRatio: '16:9',
  playbackRates: [0.5, 1, 1.5, 2],
  sources: [
    {
      src: '',
      type: 'application/x-mpegURL',
      withCredentials: true,
    },
  ],
  autoplay: true,
};
