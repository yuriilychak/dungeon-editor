/**
 * @name TextureData
 * @typedef {Object}
 * @property {string} name
 * @property {number} id
 * @property {string} atlas
 * @property {string} format
 * @property {boolean} hasPreview
 */

/**
 * @name FontData
 * @typedef {Object}
 * @property {string} name
 * @property {number} id
 * @property {number} type
 * @property {string} format
 * @property {boolean} hasPreview
 */

/**
 * @name ProjectData
 * @typedef {Object}
 * @property {string} name
 * @property {number} guid
 * @property {Array.<TextureData>} textures
 * @property {Array.<FontData>} fonts
 */

/**
 * @name FileData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 * @property {number} id
 */

/**
 * @name ResourceData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 */

/**
 * @name BMFontTextureData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 * @property {string} data
 */

/**
 * @memberOf fileUtil
 * @callback ProgressCallback
 * @param {string} path
 */
