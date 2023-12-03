let url =
  "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/";

const API_KEY = process.env.REACT_APP_API_KEY;

export const inventoryMapper = async (itemHashes) => {
  if (itemHashes.length > 1) {
    const inventory = itemHashes.map(async (item) => {
      const response = await fetch(url + item.itemHash, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      const { Response } = await response.json();
      // console.log(Response);
      return {
        name: Response.displayProperties.name,
        icon: Response.displayProperties.icon,
        flavorText: Response.flavorText,
        itemType: Response.itemTypeAndTierDisplayName,
        itemInstance: item.itemInstanceId,
        itemHash: item.itemHash,
      };
    });
    const inventoryPromises = await Promise.all(inventory);
    return inventoryPromises;
  } else {
    const response = await fetch(url + itemHashes, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const { Response } = await response.json();
    return {
      name: Response.displayProperties.name,
      icon: Response.displayProperties.icon,
      flavorText: Response.flavorText,
      itemType: Response.itemTypeAndTierDisplayName,
    };
  }
};
