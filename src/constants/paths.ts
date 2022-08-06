export const DATA_FOLDER = process.env.DATA_FOLDER_PATH;
export const WIKI_DATA_FOLDER = process.env.WIKI_FOLDER_PATH;

// Wiki content must be on a different path as it's on its own repo
export const WIKI_PAGES_FOLDER = `${WIKI_DATA_FOLDER}/wiki-pages`;

export const META_FILE = `${DATA_FOLDER}/meta.json`;
export const ITEMS_FOLDER = `${DATA_FOLDER}/items`;
export const MONSTERS_FOLDER = `${DATA_FOLDER}/monsters`;
export const WIKI_PAGE_LIST = `${DATA_FOLDER}/wiki-page-list.json`;

export const ALL_ITEMS = `${ITEMS_FOLDER}/all-items.json`;
export const ALL_ITEM_PAGE_LIST = `${ITEMS_FOLDER}/all-item-page-list.json`;
export const ALL_SETS = `${ITEMS_FOLDER}/all-sets.json`;
export const ALL_SETS_PAGE_LIST = `${ITEMS_FOLDER}/all-sets-page-list.json`;
export const ALL_RECIPES = `${ITEMS_FOLDER}/all-recipes.json`;
export const ALL_GE_RECIPES = `${ITEMS_FOLDER}/all-ge-recipes.json`;
export const GE_ITEMS = `${ITEMS_FOLDER}/ge-items.json`;
export const GE_ITEM_PAGE_LIST = `${ITEMS_FOLDER}/ge-item-page-list.json`;

export const ALL_SHOPS = `${ITEMS_FOLDER}/all-shops.json`;
export const ALL_SHOPS_PAGE_LIST = `${ITEMS_FOLDER}/all-shops-page-list.json`;

export const ALL_MONSTERS = `${MONSTERS_FOLDER}/all-monsters.json`;
export const ALL_MONSTERS_PAGE_LIST = `${MONSTERS_FOLDER}/all-monsters-page-list.json`;
