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
 * @property {Object[]} atlases
 * @property {number} atlasId
 * @property {Object[]} elements
 * @property {Object[]} fonts
 * @property {Object[]} particles
 * @property {Object[]} skeletons
 * @property {Array.<TextureData>} textures
 */

/**
 * @name FileData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 * @property {number} id
 * @property {number} parentId
 * @property {?string} preview
 * @property {boolean} compressName
 */

/**
 * @name DirectoryData
 * @typedef {Object}
 * @property {string} name
 * @property {number} parentId
 * @property {number} id
 */

/**
 * @name SectionData
 * @typedef {Object}
 * @property {FileData[]} files
 * @property {DirectoryData[]} directories
 * @property {number} guid
 */

/**
 * @name ResourceData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 */

/**
 * @name FontResourceData
 * @typedef {Object}
 * @property {string} name
 * @property {string} format
 * @property {number} id
 * @property {FONT_TYPE} type
 * @property {string} textureFormat
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


/**
 * @name RenameData
 * @typedef {Object}
 * @property {number} id
 * @property {sectionId} sectionId
 */
