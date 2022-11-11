let url =
  "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/";

export const inventoryMapper = async (itemHashes) => {
  if (itemHashes.length > 1) {
    const inventory = itemHashes.map(async (item) => {
      const response = await fetch(url + item.itemHash, {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      });
      const { Response } = await response.json();
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
    // } else {
    //   const response = await fetch(url + itemHashes, {
    //     headers: {
    //       "x-api-key": "68015959b1c44de5b97feb8911f11167",
    //     },
    //   });
    //   const { Response } = await response.json();
    //   return {
    //     name: Response.displayProperties.name,
    //     icon: Response.displayProperties.icon,
    //     flavorText: Response.flavorText,
    //     itemType: Response.itemTypeAndTierDisplayName,
    //   };
  }
};
