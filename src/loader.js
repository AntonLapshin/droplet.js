import { loadImage } from "./loaders/image";
import { loadStyle } from "./loaders/style";
import { loadScript } from "./loaders/script";
import { loadView } from "./loaders/view";

const TIMEOUT = 3000;
const LOADERS = [
  {
    type: "image",
    load: loadImage,
    ext: /png|jpg|gif/
  },
  {
    type: "style",
    load: loadStyle,
    ext: /css/
  },
  {
    type: "script",
    load: loadScript,
    ext: /js/
  },
  {
    view: "view",
    load: loadView,
    ext: /html/
  }
];

/**
 * Loads an external resource
 * @param {string} ext - External resource's extension
 * @param {string} url - URL of the the external resource
 * @returns {Promise}
 */
export const load = (ext, url) => {
  const loader = LOADERS.find(l => l.ext.test(ext));
  if (!loader) {
    throw `Loader for <${ext}> files has not been implemented`;
  }
  return new Promise((resolve, reject) => {
    if (!loader.cache) {
      loader.cache = {};
    }
    loader.load(res => {
      loader.cache[url] = res;
      resolve(res);
    });
    setTimeout(() => {
      loader.cache[url] = true;
      resolve(true);
    });
  });
};
